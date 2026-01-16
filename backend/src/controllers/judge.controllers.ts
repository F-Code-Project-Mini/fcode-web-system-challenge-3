import { NextFunction, Request, Response } from "express";
import prisma from "~/configs/prisma";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import judgeService from "~/services/judge.service";

const judgeBarem = [
    {
        target: "Quản lý thời gian",
        partitions: [
            {
                criteria: "Nhóm bắt đầu đúng giờ, kết thúc đúng thời lượng quy định",
                partitions: [
                    {
                        code: "#judge_trial_1",
                        description:
                            "<p>Bắt đầu trong <b>5 phút đầu tiên</b> thì full điểm. Sau đó <b>trừ 1 điểm / 1 phút</b> (Trừ đến 0 điểm thì dừng).<br>Hết thời lượng mà chưa trình bày xong <b>trừ 0,5 điểm / 1 slide</b> (Trừ trường hợp slide cảm ơn; kết thúc).</p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Thời lượng thuyết trình giữa các thành viên hợp lý",
                partitions: [
                    {
                        code: "#judge_trial_2",
                        description:
                            "<p>Thời lượng các thành viên nói <b>đều nhau</b>, không có người nói quá ít hoặc quá nhiều.</p>",
                        maxScore: 5,
                    },
                ],
            },
        ],
    },
    {
        target: "Slide",
        partitions: [
            {
                criteria: "Slide rõ ràng, dễ hiểu, truyền tải được nội dung chính",
                partitions: [
                    {
                        code: "#judge_trial_3",
                        description: "<p>Dùng <b>từ ngắn gọn</b>, có <b>hình ảnh minh họa</b>.</p>",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Thiết kế thống nhất, đẹp mắt, dễ theo dõi",
                partitions: [
                    {
                        code: "#judge_trial_4",
                        description:
                            "<p><b>Font, màu và bố cục slide được giữ đồng nhất</b> trong suốt bài thuyết trình. Có slide mở đầu giới thiệu và slide kết thúc cảm ơn.<br><b>(Trừ 1 điểm nếu slide không đánh số trang hoặc đánh số trang không theo trình tự)</b></p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Tính sáng tạo",
                partitions: [
                    {
                        code: "#judge_trial_5",
                        description:
                            "<p>Có <b>điểm nhấn riêng</b>, ví dụ: cách mở đầu, hình ảnh, video, tiêu đề ấn tượng.</p>",
                        maxScore: 2,
                    },
                ],
            },
        ],
    },
    {
        target: "Nội dung",
        partitions: [
            {
                criteria: "Trình bày đầy đủ kiến thức nền tảng, chính xác, có trọng tâm",
                partitions: [
                    {
                        code: "#judge_trial_6",
                        description: "<p><b>Không lan man, bám sát chủ đề</b>.</p>",
                        maxScore: 30,
                    },
                ],
            },
            {
                criteria: "Ví dụ thực tế",
                partitions: [
                    {
                        code: "#judge_trial_7",
                        description:
                            "<p>Liệt kê được các <b>ứng dụng thực tế</b> của nội dung nhóm đang thuyết trình.</p>",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "So sánh, phân tích ưu - nhược điểm",
                partitions: [
                    {
                        code: "#judge_trial_8",
                        description:
                            "<p>So sánh được <b>ít nhất 2 đối tượng</b> (VD: 2 thuật toán / 2 hướng tiếp cận, ...); <b>chỉ ra ưu – nhược và giải thích hợp lý</b>.</p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Dẫn chứng, nguồn thông tin rõ ràng và đáng tin cậy",
                partitions: [
                    {
                        code: "#judge_trial_9",
                        description: "<p>Nếu <b>không có</b> thì <b>0 điểm</b>.</p>",
                        maxScore: 3,
                    },
                ],
            },
        ],
    },
    {
        target: "Demo sản phẩm / code",
        partitions: [
            {
                criteria: "Demo được code ứng với đề",
                partitions: [
                    {
                        code: "#judge_trial_10",
                        description:
                            "<p>Nếu đề <b><i>không yêu cầu có code</i></b>, thì BGK đánh giá <b>mặt logic business đã hợp lý chưa</b>.</p>",
                        maxScore: 10,
                    },
                ],
            },
        ],
    },
    {
        target: "Kiến thức Mở Rộng",
        partitions: [
            {
                criteria: "Kiến thức đề bài không yêu cầu",
                partitions: [
                    {
                        code: "#judge_trial_11",
                        description: "<p><b>Kiến thức mở rộng</b> và phải <b>phù hợp với chủ đề</b>.</p>",
                        maxScore: 10,
                    },
                ],
            },
        ],
    },
    {
        target: "Backup",
        partitions: [
            {
                criteria: "Có phương án dự phòng hoặc hướng giải quyết thay thế cho nội dung trình bày của mình",
                partitions: [
                    {
                        code: "#judge_trial_12",
                        description:
                            "<p>Khi BGK chỉ ra điểm hạn chế của thuật toán, ứng dụng mà nhóm đang trình bày, nhóm hoặc cá nhân <b>đề xuất được một phương án khác, hoặc cải tiến hợp lý</b> để xử lý vấn đề. (Nếu phần trình bày ban đầu không có hạn chế, thì được tính full điểm.)</p>",
                        maxScore: 5,
                    },
                ],
            },
        ],
    },
];

const fetchBaremScore = async (judgeId: string, candidateId: string, codeBarem: string) => {
    return await prisma.baremScore.findFirst({
        where: {
            mentorId: judgeId,
            candidateId,
            codeBarem,
        },
    });
};

const enrichPartitionWithScore = async (partition: any, judgeId: string, candidateId: string) => {
    const score = await fetchBaremScore(judgeId, candidateId, partition.code);
    return {
        ...partition,
        scoreCurrent: score?.score ?? "",
        note: score?.note ?? "",
    };
};

const processNestedPartitions = async (partitions: any[], judgeId: string, candidateId: string) => {
    return await Promise.all(
        partitions.map((nestedPartition) => enrichPartitionWithScore(nestedPartition, judgeId, candidateId)),
    );
};

const processPartition = async (partition: any, judgeId: string, candidateId: string) => {
    if (partition.partitions && Array.isArray(partition.partitions)) {
        const nestedPartitions = await processNestedPartitions(partition.partitions, judgeId, candidateId);
        return {
            ...partition,
            partitions: nestedPartitions,
        };
    }
    return await enrichPartitionWithScore(partition, judgeId, candidateId);
};

const processBaremItem = async (item: any, judgeId: string, candidateId: string) => {
    const partitions = await Promise.all(
        item.partitions.map((partition: any) => processPartition(partition, judgeId, candidateId)),
    );
    return {
        ...item,
        partitions,
    };
};

export const getJudgeRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!;
        const result = await judgeService.getJudgeRooms(userId);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const getTeamsByRoom = async (req: Request<{ roomId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!;
        const { roomId } = req.params;
        const result = await judgeService.getTeamsByRoom(userId, roomId);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const getBarem = async (req: Request<{ candidateId: string }>, res: Response, next: NextFunction) => {
    try {
        const { candidateId } = req.params;
        const judgeId = req.userId!;
        const result = await Promise.all(judgeBarem.map((item) => processBaremItem(item, judgeId, candidateId)));
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};
