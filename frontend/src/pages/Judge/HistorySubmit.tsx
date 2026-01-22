import { History } from "lucide-react";
import Loading from "~/components/Loading";
import MobileHistories from "../Submissions/MobileHistories";
import DesktopHistories from "../Submissions/DesktopHistories";
import type { SubmissionResponseType } from "~/types/team.types";

type HistorySubmitProps = {
    submissions: SubmissionResponseType[];
    isLoading: boolean;
};

const HistorySubmit = ({ submissions, isLoading }: HistorySubmitProps) => {
    if (isLoading) return <Loading />;

    return (
        <div className="overflow-hidden rounded-md border border-gray-200/70 bg-white">
            <div className="border-b border-gray-200/70 bg-linear-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
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
                        <MobileHistories submissions={submissions} />

                        <DesktopHistories submissions={submissions} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HistorySubmit;
