import { Clock, FileText, Github, Link2, NotepadTextDashed, ShieldCheck } from "lucide-react";
import type { SubmissionResponseType } from "~/types/team.types";
import Helper from "~/utils/helper";
import { DialogDescription } from "./DialogDescription";

const DesktopHistories = ({ submissions }: { submissions: SubmissionResponseType[] }) => {
    return (
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
                                            <ShieldCheck size={16} /> Official
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-0.5 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                                            <NotepadTextDashed size={16} /> Draft
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="font-medium text-gray-900">
                                            {Helper.timeAgo(submission.submittedAt)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
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
                                                <span className="max-w-[200px] truncate">Link {linkIndex + 1}</span>
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
                                    <span className="text-xs text-gray-400 italic">Không có ghi chú</span>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default DesktopHistories;
