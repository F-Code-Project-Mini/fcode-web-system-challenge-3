import { Clock, FileText, Github, Link2, ShieldCheck, NotepadTextDashed } from "lucide-react";
import type { SubmissionResponseType } from "~/types/team.types";
import Helper from "~/utils/helper";
import { DialogDescription } from "./DialogDescription";

const MobileHistories = ({ submissions }: { submissions: SubmissionResponseType[] }) => {
    return (
        <div className="block lg:hidden">
            <div className="space-y-4 p-4">
                {submissions.map((submission, index) => {
                    const isLatest = index === 0;
                    return (
                        <div key={submission.id} className="rounded-lg border border-gray-200/80 bg-white p-4">
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
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900">
                                            {Helper.timeAgo(submission.submittedAt)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(submission.submittedAt).toLocaleString("vi-VN")}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                {/* Slide Link */}
                                <div>
                                    <p className="mb-1 text-xs font-medium text-gray-500">Slide thuyết trình</p>
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
                                    <p className="mb-1 text-xs font-medium text-gray-500">Phân công task</p>
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
                                        <p className="mb-1.5 text-xs font-medium text-gray-500">Source/Figma</p>
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
                                        <p className="mb-1.5 text-xs font-medium text-gray-500">Ghi chú</p>
                                        <DialogDescription desc={submission.note} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileHistories;
