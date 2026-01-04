import { NextFunction, Request, Response } from "express";
import { result } from "lodash";
import prisma from "~/configs/prisma";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";

const mentorBarem = [
    {
        target: "Member",
        partitions: [
            {
                code: "#mentor_1",
                criteria: "Hợp tác và giao tiếp",
                description: `
                    <div class="space-y-2">
                        <p>Tham gia đầy đủ các hoạt động họp nhóm (5 điểm)</p>
                        <p>Lắng nghe và tôn trọng ý kiến của Leader (5 điểm)</p>
                        <p>Lắng nghe đóng góp ý kiến từ các thành viên khác (5 điểm)</p>
                    </div>
                `,
                maxScore: 15,
            },
            {
                code: "#mentor_2",
                criteria: "Đóng góp",
                description: `
                    <div class="space-y-2">
                        <p>Đóng góp trong phần làm việc nhóm (Mentor cần note rõ làm nội dung gì: slide, code, ...) (5 điểm)</p>
                        <p>Tích cực đóng góp ý kiến, thảo luận cùng với nhóm (5 điểm)</p>
                    </div>
                `,
                maxScore: 10,
            },
            {
                code: "#mentor_3",
                criteria: "Kết nối giữa các thành viên",
                description: `
                    <div class="space-y-2">
                        <p>Nhiệt huyết và năng động trong việc giao lưu với các thành viên khác (5 điểm)</p>
                        <p><b>Chủ động</b> hỗ trợ các thành viên khác khi gặp khó khăn. (10 điểm)</p>
                        <p>Hòa đồng với các bạn trong nhóm (10 điểm)</p>
                    </div>
                `,
                maxScore: 25,
            },
            {
                code: "#mentor_4",
                criteria: "Quản lý thời gian",
                description: `
                    <div class="space-y-2">
                        <p>Hoàn thành task đúng deadline (5 điểm)</p>
                        <p>Chuẩn bị tốt trước khi present (5 điểm)</p>
                    </div>
                `,
                maxScore: 10,
            },
        ],
    },
    {
        target: "Leader",
        partitions: [
            {
                code: "#mentor_5",
                criteria: "Lên kế hoạch và phân công",
                description: `
                    <div class="space-y-2">
                        <p>Có lên kế hoạch, định hướng rõ ràng cho nhóm (2 điểm)</p>
                        <p>Phân chia task hợp lý, và có <b>nộp bảng phân công công việc cho nhóm</b> (3 điểm)</p>
                    </div>
                `,
                maxScore: 5,
            },
            {
                code: "#mentor_6",
                criteria: "Theo dõi tiến độ của nhóm",
                description: `
                    <div class="space-y-2">
                        <p>Thường xuyên keep track task của các thành viên (5 điểm)</p>
                        <p>Thường xuyên đôn đốc team để hoàn thành công việc (5 điểm)</p>
                    </div>
                `,
                maxScore: 10,
            },
        ],
    },
    {
        target: "Thái độ",
        partitions: [
            {
                code: "#mentor_7",
                criteria: "Thái độ",
                description: `
                    <div class="space-y-2">
                        <p>Tích cực tìm hiểu các kiến thức mới (5 điểm)</p>
                        <p>Năng nổ khi được giao đề (5 điểm)</p>
                        <p>Tôn trọng mentor (5 điểm)</p>
                        <p>Lắng nghe lời góp ý từ mentor (trong trường hợp mentor được thông báo hỗ trợ góp ý phần đó, nếu mentor không góp ý thì phần này full điểm) (5 điểm)</p>
                        <p>Dành thời gian để tìm hiểu đề (5 điểm)</p>
                    </div>
                `,
                maxScore: 25,
            },
        ],
    },
];
export const getBarem = async (req: Request, res: Response, next: NextFunction) => {
    const { candidateId } = req.params;
    const mentorId = req.userId!;
    const result = await Promise.all(
        mentorBarem.map(async (item) => {
            const partitions = await Promise.all(
                item.partitions.map(async (partition) => {
                    const score = await prisma.baremScore.findFirst({
                        where: {
                            mentorId,
                            candidateId,
                            codeBarem: partition.code,
                        },
                    });

                    return {
                        ...partition,
                        scoreCurrent: score?.score ?? "",
                        note: score?.note ?? "",
                    };
                }),
            );

            return {
                ...item,
                partitions,
            };
        }),
    );
    return res.status(HTTP_STATUS.OK).json(
        new ResponseClient({
            result,
        }),
    );
};
// const mentorBarem = [
//     {
//         target: "Trang phục",
//         partitions: [
//             {
//                 code: "#mentor_1",
//                 criteria: "Trang phục phù hợp.",
//                 description: `Lịch sự, gọn gàng, phù hợp với tính chất học thuật của buổi thuyết trình. <br/>
//                 (<span class="font-bold">Trừ 1 điểm</span> cho trường hợp mặc quần/ váy ngắn trên đầu gối; mang dép)`,
//                 maxScore: 3,
//             },
//         ],
//     },
//     {
//         target: "Thái độ",
//         partitions: [
//             {
//                 code: "#mentor_2",
//                 criteria: "Tác phong chuyên nghiệp",
//                 description:
//                     "Thể hiện sự tôn trọng, lịch sự, đúng mực với giám khảo (chào hỏi, phản ứng tích cực khi bị hỏi khó, thái độ bình tĩnh).",
//                 maxScore: 10,
//             },
//             {
//                 code: "#mentor_3",
//                 criteria: "Tiếp nhận ý kiến từ BGK",
//                 description: `Sẵn sàng tiếp nhận và thực hiện lời phê bình mang tính xây dựng; không né tránh, phản ứng tích cực khi được hỏi. <br/>
//                 (<span class="font-bold">0 điểm</span> nếu đổ lỗi cho người khác hoặc biện minh thay vì nhận trách nhiệm)`,
//                 maxScore: 5,
//             },
//             {
//                 code: "#mentor_4",
//                 criteria: "Đến đúng giờ",
//                 description: `<span class="font-bold">2 điểm</span> nếu đúng giờ.<br/>
//                 <span class="font-bold">1 điểm</span> nếu đến trễ và đã thông báo cho CLB từ trước.<br/>
//                 <span class="font-bold">0 điểm</span> nếu đến trễ nhưng không thông báo với CLB từ trước.`,
//                 maxScore: 2,
//             },
//             {
//                 code: "#mentor_5",
//                 criteria: "Tự tin thuyết trình",
//                 description: "Giữ phong thái tự tin, giọng nói rõ ràng, tốc độ nói hợp lý.",
//                 maxScore: 5,
//             },
//             {
//                 code: "#mentor_6",
//                 criteria: "Thuyết trình mà không cần script",
//                 description: `Thuyết trình tự nhiên, không cầm điện thoại, nhìn giấy.<br/>
//                 (<span class="font-bold">Trừ 2 điểm</span> cho trường hợp cầm điện thoại, giấy / nhìn chú thích trên slide quá nhiều)`,
//                 maxScore: 5,
//             },
//         ],
//     },
//     {
//         target: "Khả năng thuyết trình",
//         partitions: [
//             {
//                 code: "#mentor_7",
//                 criteria: "Eye contact",
//                 description: `Giao tiếp bằng ánh mắt với giám khảo, tạo sự kết nối.<br/>
//                 <span class="font-bold">2 điểm</span>: Ứng viên tương tác ít nhất 70% tổng thời lượng thuyết trình của mình<br/>
//                 <span class="font-bold">1 điểm</span>: Tương tác ít nhất 30%<br/>
//                 <span class="font-bold">0 điểm</span>: Cho các trường hợp còn lại`,
//                 maxScore: 2,
//             },
//             {
//                 code: "#mentor_8",
//                 criteria: "Body language",
//                 description: "Cử chỉ, điệu bộ tự nhiên, phù hợp với nội dung nói; không gò bó, không thừa động tác.",
//                 maxScore: 2,
//             },
//             {
//                 code: "#mentor_9",
//                 criteria: "Lưu loát, mạch lạc, rõ ràng, ngắn gọn và hấp dẫn.",
//                 description:
//                     "Bài nói có cấu trúc logic, xen lẫn cảm xúc hoặc ví dụ thực tế giúp tăng tính thuyết phục.",
//                 maxScore: 5,
//             },
//         ],
//     },
//     {
//         target: "Teamwork",
//         partitions: [
//             {
//                 code: "#mentor_10",
//                 criteria: "Hỗ trợ thành viên trong nhóm",
//                 description: `Lắng nghe, ra hiệu, giúp đỡ khi thành viên khác gặp sự cố (slide sai, quên ý...).<br/>
//                 Cần <span class="font-bold">trừ điểm mạnh tay</span> những trường hợp sử dụng điện thoại, làm việc riêng,... trong khi những người khác đang thuyết trình<br/>
//                 Chú đề <span class="font-bold">đáng nổi không khác gì <span class="text-red-500">quá 30s</span> mà nhóm không phát hiện hoặc bị BGK nhắc nhở thì từ cả nhóm cốt nạy.<br/>
//                 Nếu nhóm</span> thuyết trình tốt, không cần hỗ trợ thì full điểm.`,
//                 maxScore: 5,
//             },
//             {
//                 code: "#mentor_11",
//                 criteria: "Ăn ý trong trình bày",
//                 description: `Giúp đỡ thành viên khác khi không trả lời được câu hỏi.<br/>
//                 (<span class="font-bold">Trừ 2 điểm</span> nếu từ ý xen vào khi người khác đang trả lời kể cả đang trả lời sai)`,
//                 maxScore: 5,
//             },
//             {
//                 code: "#mentor_12",
//                 criteria: "Chuyển slide giữa các phần với nhau.",
//                 description: `Khi xong phần thuyết trình mời bạn kế tiếp lên để tiếp tục. (VD: Đến đây phần thuyết trình của em đã hết, e xin mời bạn ABC lên trình bài nội dung XYZ)`,
//                 maxScore: 5,
//             },
//             {
//                 code: "#mentor_13",
//                 criteria: "Nắm vững phần trình bày của bạn thân",
//                 description: "BGK xem qua yêu cầu để tái của ứng viên và quan sát ứng viên trình bày.",
//                 maxScore: 10,
//             },
//         ],
//     },
//     {
//         target: "Kiến thức và Tư duy phản biện",
//         partitions: [
//             {
//                 code: "#mentor_14",
//                 criteria: "Giải thích được các kiến thức phức tạp một cách dễ hiểu, rõ ràng và ngắn gọn",
//                 description: "",
//                 maxScore: 10,
//             },
//             {
//                 code: "#mentor_15",
//                 criteria: "Trả lời câu hỏi của giám khảo cách để hiểu, rõ ràng, không lạm man",
//                 description: "",
//                 maxScore: 10,
//             },
//             {
//                 code: "#mentor_16",
//                 criteria: "Phản biện, thuyết phục được BGK.",
//                 description: `Dựa ra vị dụ thực tế hoặc 1 lý do nào đó để bảo vệ câu trả lời của mình và thuyết phục được BGK. (<span class="font-bold">Chú ý thái độ ứng viên</span>)`,
//                 maxScore: 10,
//             },
//             {
//                 code: "#mentor_17",
//                 criteria: "Nắm được tổng quát nội dung của cả nhóm",
//                 description: `Trong lúc thuyết trình, ứng viên có liên hệ hoặc nhắc đến nội dung của các thành viên khác trong nhóm.<br/>
//                 (<span class="font-bold">BGK có thể đặt câu hỏi về phần trình bày của bạn khác để kiểm tra mức độ hiểu và nắm bắt tổng thể của ứng viên.</span>)`,
//                 maxScore: 2,
//             },
//         ],
//     },
//     {
//         target: "Năng khiếu khác",
//         partitions: [
//             {
//                 code: "#mentor_18",
//                 criteria: "Đây là điểm cộng. Do BGK tự quyết định",
//                 description: `BGK căn ghi rõ lý do hoặc tiêu chí được cộng điểm (<span class="font-bold">ví dụ: sáng tạo, phong thái ấn tượng, xử lý tình huống tốt...</span>)`,
//                 maxScore: 4,
//             },
//         ],
//     },
// ];
