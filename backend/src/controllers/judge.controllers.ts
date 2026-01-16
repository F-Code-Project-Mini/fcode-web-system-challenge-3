import { NextFunction, Request, Response } from "express";
import prisma from "~/configs/prisma";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import judgeService from "~/services/judge.service";

const judgeBarem = [
    {
        target: "Thuyết trình",
        partitions: [
            {
                criteria: "Nội dung",
                partitions: [
                    {
                        code: "#judge_1",
                        description: `<p>Nội dung rõ ràng, mạch lạc</p>`,
                        maxScore: 10,
                    },
                    {
                        code: "#judge_2",
                        description: `<p>Hiểu sâu về đề tài</p>`,
                        maxScore: 10,
                    },
                    {
                        code: "#judge_3",
                        description: `<p>Trình bày đầy đủ các phần yêu cầu</p>`,
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Kỹ năng thuyết trình",
                partitions: [
                    {
                        code: "#judge_4",
                        description: `<p>Giọng nói rõ ràng, tự tin</p>`,
                        maxScore: 5,
                    },
                    {
                        code: "#judge_5",
                        description: `<p>Sử dụng slide hiệu quả</p>`,
                        maxScore: 5,
                    },
                    {
                        code: "#judge_6",
                        description: `<p>Quản lý thời gian tốt</p>`,
                        maxScore: 5,
                    },
                ],
            },
        ],
    },
    {
        target: "Sản phẩm",
        partitions: [
            {
                criteria: "Chất lượng sản phẩm",
                partitions: [
                    {
                        code: "#judge_7",
                        description: `<p>Sản phẩm hoạt động tốt, ít lỗi</p>`,
                        maxScore: 15,
                    },
                    {
                        code: "#judge_8",
                        description: `<p>Giao diện đẹp, thân thiện người dùng</p>`,
                        maxScore: 10,
                    },
                    {
                        code: "#judge_9",
                        description: `<p>Code sạch, có tổ chức</p>`,
                        maxScore: 10,
                    },
                ],
            },
        ],
    },
    {
        target: "Trả lời câu hỏi",
        partitions: [
            {
                criteria: "Khả năng trả lời",
                partitions: [
                    {
                        code: "#judge_10",
                        description: `<p>Trả lời chính xác, logic</p>`,
                        maxScore: 10,
                    },
                    {
                        code: "#judge_11",
                        description: `<p>Thể hiện kiến thức chuyên sâu</p>`,
                        maxScore: 10,
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
