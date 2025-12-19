import { ExternalLink, History } from "lucide-react";
import { useState } from "react";
interface Submission {
    id: number;
    phoneNumber: string;
    productLink: string;
    codeLink: string;
    description: string;
    submittedAt: string;
    status: "pending" | "approved" | "rejected";
}

const HistorySubmit = () => {
    const [submissions] = useState<Submission[]>([
        {
            id: 1,
            phoneNumber: "0123456789",
            productLink: "https://demo.example.com",
            codeLink: "https://github.com/user/project",
            description: "Đây là bản demo hoàn chỉnh của dự án",
            submittedAt: "2025-12-19 14:30:00",
            status: "approved",
        },
        {
            id: 2,
            phoneNumber: "0123456789",
            productLink: "https://demo-v2.example.com",
            codeLink: "https://github.com/user/project-v2",
            description: "Cập nhật tính năng mới và sửa lỗi",
            submittedAt: "2025-12-19 16:45:00",
            status: "pending",
        },
    ]);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-100/60 px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg">
                    <History className="h-5 w-5" />
                    Lịch sử nộp
                </h2>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Danh sách các lần nộp bài của nhóm (Tổng: {submissions.length} lần)
                </p>
            </div>

            <div className="overflow-x-auto">
                {submissions.length === 0 ? (
                    <div className="py-12 text-center">
                        <History className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Bạn chưa có lần nộp bài nào</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Lần nộp
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Thời gian nộp
                                </th>

                                <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                    Link
                                </th>
                                <th className="hidden px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {submissions
                                .slice()
                                .reverse()
                                .map((submission, index) => {
                                    const isLatest = index === 0;
                                    return (
                                        <tr
                                            key={submission.id}
                                            className={`transition-colors hover:bg-gray-50 ${
                                                isLatest ? "bg-blue-50/30" : ""
                                            }`}
                                        >
                                            <td className="px-3 py-3 text-sm sm:px-6 sm:py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">
                                                        #{submissions.length - index}
                                                    </span>
                                                    {isLatest && (
                                                        <span className="bg-primary rounded-full px-2 py-0.5 text-xs font-semibold text-white">
                                                            Mới nhất
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                {new Date(submission.submittedAt).toLocaleString("vi-VN")}
                                            </td>

                                            <td className="px-3 py-3 text-sm sm:px-6 sm:py-4">
                                                <div className="flex flex-col gap-1">
                                                    <a
                                                        href={submission.productLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                        <span className="truncate">Demo</span>
                                                    </a>
                                                    <a
                                                        href={submission.codeLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-gray-600 transition-colors hover:text-gray-900 hover:underline"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                        <span className="truncate">Code</span>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="hidden px-3 py-3 text-sm sm:px-6 sm:py-4 md:table-cell">
                                                {/* {getStatusBadge(submission.status)} */}
                                                ok
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default HistorySubmit;
