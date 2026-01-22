export const judgeBaremOfficial = [
    {
        target: "Trang phục",
        partitions: [
            {
                criteria: "Trang phục phù hợp.",
                partitions: [
                    {
                        code: "#judge_official_personal_1",
                        description:
                            "<p>Mặc áo ĐH FPT/ phù hợp với tính chất học thuật của buổi thuyết trình.<br><b>(Trừ 1 điểm cho trường hợp mặc quần/ váy ngắn trên đầu gối; mang dép)</b></p>",
                        maxScore: 3,
                    },
                ],
            },
        ],
    },
    {
        target: "Thái độ",
        partitions: [
            {
                criteria: "Tác phong chuyên nghiệp",
                partitions: [
                    {
                        code: "#judge_official_personal_2",
                        description:
                            "<p>Thể hiện sự tôn trọng, lịch sự, đúng mực với giám khảo (chào hỏi, phản ứng tích cực khi bị hỏi khó, thái độ bình tĩnh).</p>",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Tiếp nhận ý kiến từ BGK",
                partitions: [
                    {
                        code: "#judge_official_personal_3",
                        description:
                            "<p>Sẵn sàng tiếp nhận và thực hiện lời phê bình mang tính xây dựng; không né tránh, phản ứng tích cực khi được hỏi.<br><b>(0 điểm nếu đổ lỗi cho người khác hoặc biện minh thay vì nhận trách nhiệm)</b></p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Đến đúng giờ",
                partitions: [
                    {
                        code: "#judge_official_personal_4",
                        description:
                            "<p><b>2 điểm</b> nếu đúng giờ.<br><b>1 điểm</b> nếu đến trễ và đã thông báo cho CLB từ trước.<br><b>0 điểm</b> nếu đến trễ nhưng không thông báo với CLB từ trước.</p>",
                        maxScore: 2,
                    },
                ],
            },
        ],
    },
    {
        target: "Khả năng thuyết trình",
        partitions: [
            {
                criteria: "Tự tin thuyết trình",
                partitions: [
                    {
                        code: "#judge_official_personal_5",
                        description: "<p>Giữ phong thái tự tin, giọng nói rõ ràng, tốc độ nói hợp lý.</p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Thuyết trình mà không cần script",
                partitions: [
                    {
                        code: "#judge_official_personal_6",
                        description:
                            "<p>Thuyết trình tự nhiên, không cầm điện thoại, nhìn giấy.<br><b>(Trừ 2 điểm cho trường hợp cầm điện thoại, giấy / nhìn chữ trên slide đọc quá nhiều)</b></p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Eye contact",
                partitions: [
                    {
                        code: "#judge_official_personal_7",
                        description:
                            "<p>Giao tiếp bằng ánh mắt với giám khảo, tạo sự kết nối.<br><b>2 điểm:</b> Ứng viên tương tác ít nhất 70% tổng thời lượng thuyết trình của mình<br><b>1 điểm:</b> Tương tác ít nhất 30%<br><b>0 điểm:</b> Cho các trường hợp còn lại</p>",
                        maxScore: 2,
                    },
                ],
            },
            {
                criteria: "Body language",
                partitions: [
                    {
                        code: "#judge_official_personal_8",
                        description:
                            "<p>Cử chỉ, điệu bộ tự nhiên, phù hợp với nội dung nói; không gò bó, không thừa động tác.</p>",
                        maxScore: 2,
                    },
                ],
            },
            {
                criteria: "Lưu loát, mạch lạc, rõ ràng, ngắn gọn và hấp dẫn.",
                partitions: [
                    {
                        code: "#judge_official_personal_9",
                        description:
                            "<p>Bài nói có cấu trúc logic, xen lẫn cảm xúc hoặc ví dụ thực tế giúp tăng tính thuyết phục.</p>",
                        maxScore: 5,
                    },
                ],
            },
        ],
    },
    {
        target: "Teamwork",
        partitions: [
            {
                criteria: "Hỗ trợ thành viên trong nhóm",
                partitions: [
                    {
                        code: "#judge_official_personal_10",
                        description:
                            "<p>Lắng nghe, ra hiệu, giúp đỡ khi thành viên khác gặp sự cố (slide sai, quên ý,...).<br>Cần <b>trừ điểm mạnh tay</b> những trường hợp sử dụng điện thoại, làm việc riêng, ... trong khi những người khác đang thuyết trình.<br>Chủ đề đang nói <b>không khớp với slide quá 30s</b> mà nhóm không phát hiện hoặc bị BGK nhắc nhở thì 0đ cả nhóm cột này.<br>Nếu nhóm thuyết trình tốt, không cần hỗ trợ thì full điểm.</p>",
                        maxScore: 5,
                    },
                    {
                        code: "#judge_official_personal_11",
                        description:
                            "<p>Giúp đỡ thành viên khác khi không trả lời được câu hỏi.<br><b>(Trừ 2 điểm nếu tự ý xen vào khi người khác đang trả lời kể cả đang trả lời sai)</b></p>",
                        maxScore: 5,
                    },
                ],
            },
            {
                criteria: "Ăn ý trong trình bày",
                partitions: [
                    {
                        code: "#judge_official_personal_12",
                        description:
                            "<p>Chuyển slide giữa các phần với nhau.<br>Khi xong phần thuyết trình mời bạn kế tiếp lên để tiếp tục. (VD: Đến đây phần thuyết trình của em đã hết, e xin mời bạn ABC lên trình bày nội dung XYZ)</p>",
                        maxScore: 5,
                    },
                ],
            },
        ],
    },
    {
        target: "Kiến thức và Tư duy phản biện",
        partitions: [
            {
                criteria: "Nắm vững phần trình bày của bản thân",
                partitions: [
                    {
                        code: "#judge_official_personal_13",
                        description: "<p>BGK xem qua yêu cầu đề tài của ứng viên và quan sát ứng viên trình bày.</p>",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Giải thích được các kiến thức phức tạp một cách rõ ràng và ngắn gọn",
                partitions: [
                    {
                        code: "#judge_official_personal_14",
                        description: "",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Trả lời câu hỏi câu hỏi cách dễ hiểu, rõ ràng, không lan man",
                partitions: [
                    {
                        code: "#judge_official_personal_15",
                        description: "",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Phản biện, thuyết phục được BGK.",
                partitions: [
                    {
                        code: "#judge_official_personal_16",
                        description:
                            "<p>Đưa ra ví dụ thực tế hoặc 1 lý do nào đó để bảo vệ câu trả lời của mình và thuyết phục được BGK. (Chú ý thái độ ứng viên)</p>",
                        maxScore: 10,
                    },
                ],
            },
            {
                criteria: "Nắm được tổng quát nội dung của cả nhóm",
                partitions: [
                    {
                        code: "#judge_official_personal_17",
                        description:
                            "<p>Trong lúc thuyết trình, ứng viên có liên hệ hoặc nhắc đến nội dung của các thành viên khác trong nhóm.<br>(BGK có thể đặt câu hỏi về phần trình bày của bạn khác để kiểm tra mức độ hiểu và nắm bắt tổng thể của ứng viên.)</p>",
                        maxScore: 2,
                    },
                ],
            },
        ],
    },
    {
        target: "Năng khiếu khác",
        partitions: [
            {
                criteria: "Đây là điểm cộng. Do BGK tự quyết định",
                partitions: [
                    {
                        code: "#judge_official_personal_18",
                        description:
                            "<p>BGK cần ghi rõ lý do hoặc tiêu chí được cộng điểm (ví dụ: sáng tạo, phong thái ấn tượng, xử lý tình huống tốt...)</p>",
                        maxScore: 4,
                    },
                ],
            },
        ],
    },
];
