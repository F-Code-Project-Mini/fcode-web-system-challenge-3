import { useState } from "react";
import { Award } from "lucide-react";

const ScoreBoardPage = () => {
    const [activeRound, setActiveRound] = useState<1 | 2>(1);

    const round1Data = [
        {
            rank: 1,
            scores: [8.5, 9.0, 8.8, 9.2, 8.7],
            reviewers: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E"],
        },
    ];

    const round2Data = [
        {
            rank: 1,
            scores: [9.0, 8.8, 9.2, 8.9],
            reviewers: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"],
        },
    ];

    const calculateAverage = (scores: number[]) => {
        const sum = scores.reduce((a, b) => a + b, 0);
        return (sum / scores.length).toFixed(2);
    };

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Bảng điểm của bạn</h1>
                <span className="mt-2 block text-sm text-gray-600">Điểm số của bạn trong các vòng trước.</span>
            </section>

            <div className="mx-4 rounded-lg border border-gray-200 bg-white shadow-xs sm:mx-0">
                <div className="border-b border-gray-200">
                    <div className="flex gap-2 overflow-x-auto px-4 sm:gap-4 sm:px-6">
                        <button
                            onClick={() => setActiveRound(1)}
                            className={`cursor-pointer border-b-2 px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
                                activeRound === 1
                                    ? "border-primary text-primary"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Challenge 1
                        </button>
                        <button
                            onClick={() => setActiveRound(2)}
                            className={`cursor-pointer border-b-2 px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors sm:px-4 ${
                                activeRound === 2
                                    ? "border-primary text-primary"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Challenge 2
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {activeRound === 1 ? (
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Xếp hạng
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Lần nộp 1
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Lần nộp 2
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Lần nộp 3
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Lần nộp 4
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Lần nộp 5
                                    </th>
                                    <th className="bg-primary/5 px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Điểm TB
                                    </th>
                                </tr>
                                <tr className="border-t border-gray-200 bg-gray-100/50">
                                    <th className="px-6 py-2 text-left text-xs text-gray-500 italic">Người chấm</th>
                                    {round1Data[0].reviewers.map((reviewer, idx) => (
                                        <th key={idx} className="px-6 py-2 text-center text-xs text-gray-500 italic">
                                            {reviewer}
                                        </th>
                                    ))}
                                    <th className="bg-primary/5 px-6 py-2 text-center text-xs text-gray-500 italic"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {round1Data.map((item, index) => (
                                    <tr key={index} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Award className="h-5 w-5 text-gray-300" />
                                                <span className="text-sm font-semibold text-gray-900">
                                                    #{item.rank}
                                                </span>
                                            </div>
                                        </td>

                                        {item.scores.map((score, idx) => (
                                            <td
                                                key={idx}
                                                className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700"
                                            >
                                                {score.toFixed(1)}
                                            </td>
                                        ))}
                                        <td className="bg-primary/5 px-6 py-4 text-center text-sm font-bold whitespace-nowrap text-gray-900">
                                            {calculateAverage(item.scores)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Xếp hạng
                                    </th>

                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Giám khảo
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Giám khảo
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Giám khảo
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Giám khảo
                                    </th>
                                    <th className="bg-primary/5 px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                        Điểm TB
                                    </th>
                                </tr>
                                <tr className="border-t border-gray-200 bg-gray-100/50">
                                    <th className="px-6 py-2 text-left text-xs text-gray-500 italic">Người chấm</th>
                                    {round2Data[0].reviewers.map((reviewer, idx) => (
                                        <th key={idx} className="px-6 py-2 text-center text-xs text-gray-500 italic">
                                            {reviewer}
                                        </th>
                                    ))}
                                    <th className="bg-primary/5 px-6 py-2 text-center text-xs text-gray-500 italic"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {round2Data.map((item, index) => (
                                    <tr key={index} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Award className="h-5 w-5 text-gray-300" />
                                                <span className="text-sm font-semibold text-gray-900">
                                                    #{item.rank}
                                                </span>
                                            </div>
                                        </td>
                                        {item.scores.map((score, idx) => (
                                            <td
                                                key={idx}
                                                className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700"
                                            >
                                                {score.toFixed(1)}
                                            </td>
                                        ))}
                                        <td className="bg-primary/5 px-6 py-4 text-center text-sm font-bold whitespace-nowrap text-gray-900">
                                            {calculateAverage(item.scores)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default ScoreBoardPage;
