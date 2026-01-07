import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useState } from "react";
import { Note } from "./Note";

const baremJudge = [
    {
        target: "Trang phục",
        partitions: [
            {
                criteria: "x",
                description: `Lxxxxxxxxxxxxxxxxxxxxxxxx <br/>
                (<span class="font-bold">Trừ 1 điểm</span>xxxx`,
                maxScore: 3,
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
