import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useState } from "react";
import { Note } from "./Note";
import { ShowTopic } from "~/pages/Candidate/ShowTopic";

const baremJudge = [
    {
        target: "Trang phục",
        partitions: [
            {
                criteria: "Trang phục phù hợp.",
                description: `Lịch sự, gọn gàng, phù hợp với tính chất học thuật của buổi thuyết trình. <br/>
                (<span class="font-bold">Trừ 1 điểm</span> cho trường hợp mặc quần/ váy ngắn trên đầu gối; mang dép)`,
                maxScore: 3,
            },
        ],
    },
    {
        target: "Thái độ",
        partitions: [
            {
                criteria: "Tác phong chuyên nghiệp",
                description:
                    "Thể hiện sự tôn trọng, lịch sự, đúng mực với giám khảo (chào hỏi, phản ứng tích cực khi bị hỏi khó, thái độ bình tĩnh).",
                maxScore: 10,
            },
            {
                criteria: "Tiếp nhận ý kiến từ BGK",
                description: `Sẵn sàng tiếp nhận và thực hiện lời phê bình mang tính xây dựng; không né tránh, phản ứng tích cực khi được hỏi. <br/>
                (<span class="font-bold">0 điểm</span> nếu đổ lỗi cho người khác hoặc biện minh thay vì nhận trách nhiệm)`,
                maxScore: 5,
            },
            {
                criteria: "Đến đúng giờ",
                description: `<span class="font-bold">2 điểm</span> nếu đúng giờ.<br/>
                <span class="font-bold">1 điểm</span> nếu đến trễ và đã thông báo cho CLB từ trước.<br/>
                <span class="font-bold">0 điểm</span> nếu đến trễ nhưng không thông báo với CLB từ trước.`,
                maxScore: 2,
            },
            {
                criteria: "Tự tin thuyết trình",
                description: "Giữ phong thái tự tin, giọng nói rõ ràng, tốc độ nói hợp lý.",
                maxScore: 5,
            },
            {
                criteria: "Thuyết trình mà không cần script",
                description: `Thuyết trình tự nhiên, không cầm điện thoại, nhìn giấy.<br/>
                (<span class="font-bold">Trừ 2 điểm</span> cho trường hợp cầm điện thoại, giấy / nhìn chú thích trên slide quá nhiều)`,
                maxScore: 5,
            },
        ],
    },
    {
        target: "Khả năng thuyết trình",
        partitions: [
            {
                criteria: "Eye contact",
                description: `Giao tiếp bằng ánh mắt với giám khảo, tạo sự kết nối.<br/>
                <span class="font-bold">2 điểm</span>: Ứng viên tương tác ít nhất 70% tổng thời lượng thuyết trình của mình<br/>
                <span class="font-bold">1 điểm</span>: Tương tác ít nhất 30%<br/>
                <span class="font-bold">0 điểm</span>: Cho các trường hợp còn lại`,
                maxScore: 2,
            },
            {
                criteria: "Body language",
                description: "Cử chỉ, điệu bộ tự nhiên, phù hợp với nội dung nói; không gò bó, không thừa động tác.",
                maxScore: 2,
            },
            {
                criteria: "Lưu loát, mạch lạc, rõ ràng, ngắn gọn và hấp dẫn.",
                description:
                    "Bài nói có cấu trúc logic, xen lẫn cảm xúc hoặc ví dụ thực tế giúp tăng tính thuyết phục.",
                maxScore: 5,
            },
        ],
    },
    {
        target: "Teamwork",
        partitions: [
            {
                criteria: "Hỗ trợ thành viên trong nhóm",
                description: `Lắng nghe, ra hiệu, giúp đỡ khi thành viên khác gặp sự cố (slide sai, quên ý...).<br/>
                Cần <span class="font-bold">trừ điểm mạnh tay</span> những trường hợp sử dụng điện thoại, làm việc riêng,... trong khi những người khác đang thuyết trình<br/>
                Chú đề <span class="font-bold">đáng nổi không khác gì <span class="text-red-500">quá 30s</span> mà nhóm không phát hiện hoặc bị BGK nhắc nhở thì từ cả nhóm cốt nạy.<br/>
                Nếu nhóm</span> thuyết trình tốt, không cần hỗ trợ thì full điểm.`,
                maxScore: 5,
            },
            {
                criteria: "Ăn ý trong trình bày",
                description: `Giúp đỡ thành viên khác khi không trả lời được câu hỏi.<br/>
                (<span class="font-bold">Trừ 2 điểm</span> nếu từ ý xen vào khi người khác đang trả lời kể cả đang trả lời sai)`,
                maxScore: 5,
            },
            {
                criteria: "Chuyển slide giữa các phần với nhau.",
                description: `Khi xong phần thuyết trình mời bạn kế tiếp lên để tiếp tục. (VD: Đến đây phần thuyết trình của em đã hết, e xin mời bạn ABC lên trình bài nội dung XYZ)`,
                maxScore: 5,
            },
            {
                criteria: "Nắm vững phần trình bày của bạn thân",
                description: "BGK xem qua yêu cầu để tái của ứng viên và quan sát ứng viên trình bày.",
                maxScore: 10,
            },
        ],
    },
    {
        target: "Kiến thức và Tư duy phản biện",
        partitions: [
            {
                criteria: "Giải thích được các kiến thức phức tạp một cách dễ hiểu, rõ ràng và ngắn gọn",
                description: "",
                maxScore: 10,
            },
            {
                criteria: "Trả lời câu hỏi của giám khảo cách để hiểu, rõ ràng, không lạm man",
                description: "",
                maxScore: 10,
            },
            {
                criteria: "Phản biện, thuyết phục được BGK.",
                description: `Dựa ra vị dụ thực tế hoặc 1 lý do nào đó để bảo vệ câu trả lời của mình và thuyết phục được BGK. (<span class="font-bold">Chú ý thái độ ứng viên</span>)`,
                maxScore: 10,
            },
            {
                criteria: "Nắm được tổng quát nội dung của cả nhóm",
                description: `Trong lúc thuyết trình, ứng viên có liên hệ hoặc nhắc đến nội dung của các thành viên khác trong nhóm.<br/>
                (<span class="font-bold">BGK có thể đặt câu hỏi về phần trình bày của bạn khác để kiểm tra mức độ hiểu và nắm bắt tổng thể của ứng viên.</span>)`,
                maxScore: 2,
            },
        ],
    },
    {
        target: "Năng khiếu khác",
        partitions: [
            {
                criteria: "Đây là điểm cộng. Do BGK tự quyết định",
                description: `BGK căn ghi rõ lý do hoặc tiêu chí được cộng điểm (<span class="font-bold">ví dụ: sáng tạo, phong thái ấn tượng, xử lý tình huống tốt...</span>)`,
                maxScore: 4,
            },
        ],
    },
];

const JudgeBaremPage = () => {
    const candidates = ["Phạm Hoàng Tuấn", "Lâm Hoàng An", "Ngô Ngọc Gia Hân", "Hồ Lê Thiên An"];
    const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
    const [scores, setScores] = useState<{ [key: string]: number }>({});

    const totalMaxScore = baremJudge.reduce((sum, item) => {
        return sum + item.partitions.reduce((partSum, part) => partSum + part.maxScore, 0);
    }, 0);

    const totalCurrentScore = Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);

    const handleScoreChange = (key: string, value: string) => {
        const numValue = parseFloat(value);
        setScores((prev) => ({
            ...prev,
            [key]: isNaN(numValue) ? 0 : numValue,
        }));
    };

    return (
        <section className="px-4 sm:px-0">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Chấm điểm Challenge 3</h1>
                <p className="mt-2 text-sm text-gray-600">Vui lòng chọn ứng viên và điền điểm cho từng tiêu chí</p>
            </div>
            {/* <ShowTopic urlPdf="" /> */}
            <div className="my-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
                <h3 className="text-primary sm:text-md mb-4 text-base font-semibold">Ứng viên</h3>
                <RadioGroup
                    value={selectedCandidate}
                    onValueChange={setSelectedCandidate}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {candidates.map((candidate) => (
                        <label
                            key={candidate}
                            htmlFor={candidate}
                            className="hover:border-primary/50 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50"
                        >
                            <RadioGroupItem value={candidate} id={candidate} />
                            <span className="flex-1 cursor-pointer text-sm font-medium text-gray-900">
                                {candidate} (0 điểm)
                            </span>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <section className="my-6" id="barem-table">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-4 sm:px-6">
                        <h2 className="text-base font-bold text-gray-900 sm:text-lg">ỨNG VIÊN: Phạm Hoàng Tuấn</h2>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Vui lòng nhập điểm cho từng tiêu chí dưới đây
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="sticky top-0 bg-gray-50">
                                <tr className="divide-x divide-gray-200">
                                    <th className="w-32 px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Mục tiêu
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Tiêu chí
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Mô tả
                                    </th>
                                    <th className="w-32 px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Điểm
                                    </th>
                                    <th className="w-10 px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {baremJudge.flatMap((item) =>
                                    item.partitions.map((part, index) => {
                                        const scoreKey = `${item.target}-${index}`;
                                        return (
                                            <tr
                                                key={scoreKey}
                                                className="divide-x divide-gray-100 transition-colors hover:bg-gray-50"
                                            >
                                                {index === 0 && (
                                                    <td
                                                        rowSpan={item.partitions.length}
                                                        className="align-center bg-gray-50/50 px-4 py-4 text-center"
                                                    >
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {item.target}
                                                        </span>
                                                    </td>
                                                )}

                                                <td className="align-center px-4 py-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {part.criteria}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 align-top">
                                                    <div
                                                        className="text-sm leading-relaxed text-gray-600"
                                                        dangerouslySetInnerHTML={{ __html: part.description || "—" }}
                                                    />
                                                </td>

                                                <td className="px-4 py-4 text-center align-top">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max={part.maxScore}
                                                            step="0.5"
                                                            value={scores[scoreKey] || ""}
                                                            onChange={(e) =>
                                                                handleScoreChange(scoreKey, e.target.value)
                                                            }
                                                            placeholder="0"
                                                            className="disabled:focus:border-primary disabled:focus:ring-primary w-16 rounded border border-gray-200 px-2 py-1.5 text-center text-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                                        />
                                                        <span className="text-sm font-medium text-gray-600">
                                                            / {part.maxScore}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="cursor-pointer px-4 py-4 align-top">
                                                    <Note />
                                                </td>
                                            </tr>
                                        );
                                    }),
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <TotalScore totalCurrentScore={totalCurrentScore} totalMaxScore={totalMaxScore} />
        </section>
    );
};
const TotalScore = ({ totalCurrentScore, totalMaxScore }: { totalCurrentScore: number; totalMaxScore: number }) => (
    <div className="my-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-baseline gap-2">
            <span className="text-md font-semibold text-gray-700 sm:text-lg">Tổng điểm:</span>
            <span
                className={`${totalCurrentScore <= totalMaxScore ? `text-primary` : `text-red-600`} text-2xl font-bold sm:text-3xl`}
            >
                {totalCurrentScore.toFixed(1)}
            </span>
            <span className="text-lg font-medium text-gray-600">/ {totalMaxScore}</span>
        </div>
        <span className="font-bold italic">Điểm được lưu tự động</span>
    </div>
);
export default JudgeBaremPage;
