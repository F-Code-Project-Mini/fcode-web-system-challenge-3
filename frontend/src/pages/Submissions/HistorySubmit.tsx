import { ExternalLink, History, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import { useAppSelector } from "~/hooks/useRedux";
import Loading from "~/components/Loading";

const HistorySubmit = () => {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const teamId = userInfo.candidate?.teamId || "";

    const { data: submissions, isLoading } = useQuery({
        queryKey: ["submissions", teamId],
        queryFn: async () => {
            if (!teamId) return [];
            const res = await TeamApi.getSubmissionInTeam(teamId);
            return res.result;
        },
        enabled: !!teamId,
    });

    if (isLoading) return <Loading />;

    return (
        <div className="overflow-hidden rounded-md border border-gray-200/70 bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Lịch sử nộp bài</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Danh sách các lần nộp bài của nhóm.
                </p>
            </div>

            <div className="overflow-x-auto">
                {!submissions || submissions.length === 0 ? (
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
                                    Ghi chú
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
                                                        href={submission.presentationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:text-primary/80 flex items-center gap-1.5 font-medium transition-colors"
                                                    >
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                        <span>Slide & Sheet</span>
                                                    </a>
                                                    {submission.productLink && (
                                                        <a
                                                            href={submission.productLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-gray-900"
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                            <span>Source/Figma</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                <p className="max-w-xs truncate">
                                                    {submission.note || (
                                                        <span className="text-gray-400 italic">Không có ghi chú</span>
                                                    )}
                                                </p>
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
