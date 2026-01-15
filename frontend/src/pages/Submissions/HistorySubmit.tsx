import { History, Clock, FileText, Github, Link2, ShieldCheck, NotepadTextDashed } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import { useAppSelector } from "~/hooks/useRedux";
import Loading from "~/components/Loading";
import { DialogDescription } from "./DialogDescription";

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
                    <>
                        {/* Mobile Card View */}
                        <div className="block lg:hidden">
                            <div className="space-y-4 p-4">
                                {submissions.map((submission, index) => {
                                    const isLatest = index === 0;
                                    return (
                                        <div
                                            key={submission.id}
                                            className="rounded-lg border border-gray-200/80 bg-white p-4"
                                        >
                                            {/* Header */}
                                            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base font-semibold text-gray-900">
                                                        Lần #{submissions.length - index}
                                                    </span>
                                                    {isLatest ? (
                                                        <span className="bg-primary/10 text-primary flex items-center gap-0.5 rounded-md px-2 py-0.5 text-xs font-medium">
                                                            <ShieldCheck size={16} /> Final
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-0.5 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                                                            <NotepadTextDashed size={16} /> Draft
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Clock className="h-3 w-3" />
                                                    <span>
                                                        {new Date(submission.submittedAt).toLocaleDateString("vi-VN")}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-3">
                                                {/* Slide Link */}
                                                <div>
                                                    <p className="mb-1 text-xs font-medium text-gray-500">
                                                        Slide thuyết trình
                                                    </p>
                                                    {submission.slideLink ? (
                                                        <a
                                                            href={submission.slideLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
                                                        >
                                                            <Link2 className="h-3.5 w-3.5" />
                                                            <span>Xem slide</span>
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Chưa có</span>
                                                    )}
                                                </div>

                                                {/* Task Assignment */}
                                                <div>
                                                    <p className="mb-1 text-xs font-medium text-gray-500">
                                                        Phân công task
                                                    </p>
                                                    {submission.taskAssignmentLink ? (
                                                        <a
                                                            href={submission.taskAssignmentLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 text-sm text-gray-700 transition-colors hover:text-gray-900"
                                                        >
                                                            <FileText className="h-3.5 w-3.5" />
                                                            <span>Xem sheet</span>
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Chưa có</span>
                                                    )}
                                                </div>

                                                {/* Product Links */}
                                                {submission.productLinks && submission.productLinks.length > 0 && (
                                                    <div>
                                                        <p className="mb-1.5 text-xs font-medium text-gray-500">
                                                            Source/Figma
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {submission.productLinks.map((link, linkIndex) => (
                                                                <a
                                                                    key={linkIndex}
                                                                    href={link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100"
                                                                >
                                                                    <Github className="h-3 w-3" />
                                                                    <span>Link {linkIndex + 1}</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Note */}
                                                {submission.note && (
                                                    <div>
                                                        <p className="mb-1.5 text-xs font-medium text-gray-500">
                                                            Ghi chú
                                                        </p>
                                                        <DialogDescription desc={submission.note} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <table className="hidden w-full lg:table">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Lần nộp
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Thời gian
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Slide thuyết trình
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Phân công task
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Source/Figma
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                {submissions.slice().map((submission, index) => {
                                    const isLatest = index === 0;
                                    return (
                                        <tr key={submission.id} className="transition-colors hover:bg-gray-50/50">
                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                <div className="flex items-center gap-2">
                                                    <span>#{submissions.length - index}</span>
                                                    {isLatest ? (
                                                        <span className="bg-primary/10 text-primary flex items-center gap-0.5 rounded-md px-2 py-0.5 text-xs font-medium">
                                                            <ShieldCheck size={16} /> Final
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-0.5 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                                                            <NotepadTextDashed size={16} /> Draft
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
                                                {submission.slideLink ? (
                                                    <a
                                                        href={submission.slideLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:text-primary/80 flex items-center gap-1.5 font-medium transition-colors"
                                                    >
                                                        <Link2 className="h-3.5 w-3.5" />
                                                        <span>Xem slide</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Chưa có</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                {submission.taskAssignmentLink ? (
                                                    <a
                                                        href={submission.taskAssignmentLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-gray-900"
                                                    >
                                                        <FileText className="h-3.5 w-3.5" />
                                                        <span>Xem sheet</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Chưa có</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                {submission.productLinks && submission.productLinks.length > 0 ? (
                                                    <div className="flex flex-col gap-1.5">
                                                        {submission.productLinks.map((link, linkIndex) => (
                                                            <a
                                                                key={linkIndex}
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-gray-900"
                                                            >
                                                                <Github className="h-3.5 w-3.5" />
                                                                <span className="max-w-[200px] truncate">
                                                                    Link {linkIndex + 1}
                                                                </span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Không có</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                {submission.note ? (
                                                    <DialogDescription desc={submission.note} />
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">
                                                        Không có ghi chú
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default HistorySubmit;
