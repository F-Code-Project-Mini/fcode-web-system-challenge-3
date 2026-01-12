import { ExternalLink, History, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { useState } from "react";
interface Submission {
    id: number;
    phoneNumber: string;
    productLink: string;
    codeLink: string;
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
            submittedAt: "2025-12-19 14:30:00",
            status: "approved",
        },
        {
            id: 2,
            phoneNumber: "0123456789",
            productLink: "https://demo-v2.example.com",
            codeLink: "https://github.com/user/project-v2",

            submittedAt: "2025-12-19 16:45:00",
            status: "pending",
        },
    ]);

    const getStatusBadge = (status: Submission["status"]) => {
        switch (status) {
            case "approved":
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-green-200/50 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Đã ghi nhận
                    </span>
                );
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200/50 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        <XCircle className="h-3.5 w-3.5" />
                        Không hợp lệ
                    </span>
                );
            case "pending":
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-yellow-200/50 bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Chờ xác nhận
                    </span>
                );
        }
    };

    return (
        <div className="overflow-hidden rounded-md border border-gray-200/70 bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Lịch sử nộp bài</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Danh sách các lần nộp bài của nhóm.
                </p>
            </div>

            <div className="overflow-x-auto">
                {submissions.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <History className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-900">Chưa có lịch sử nộp bài</p>
                        <p className="mt-1 text-xs text-gray-500">Hãy nộp bài dự thi của bạn ở form phía trên</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Lần nộp
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Thời gian
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Link sản phẩm
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 bg-white">
                            {submissions
                                .slice()
                                .reverse()
                                .map((submission, index) => {
                                    const isLatest = index === 0;
                                    return (
                                        <tr key={submission.id} className="transition-colors hover:bg-gray-50/50">
                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                <div className="flex items-center gap-2">
                                                    <span>#{submissions.length - index}</span>
                                                    {isLatest && (
                                                        <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
                                                            Mới nhất
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                    <span>
                                                        {new Date(submission.submittedAt).toLocaleString("vi-VN")}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                <div className="flex flex-col gap-2">
                                                    <a
                                                        href={submission.productLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:text-primary/80 flex items-center gap-1.5 font-medium transition-colors"
                                                    >
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                        <span>Xem sản phẩm</span>
                                                    </a>
                                                    {submission.codeLink && (
                                                        <a
                                                            href={submission.codeLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-gray-900"
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                            <span>Mã nguồn</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4">
                                                {getStatusBadge(submission.status)}
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
