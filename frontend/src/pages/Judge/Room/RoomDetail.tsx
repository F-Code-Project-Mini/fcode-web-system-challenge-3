import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";
import Loading from "~/components/Loading";
import WelcomePartition from "~/components/WelcomePartition";
import BadgeLeader from "~/components/BadgeLeader";
import { Button } from "~/components/ui/button";
import { Sparkles } from "lucide-react";
import HistorySubmit from "../HistorySubmit";
import Helper from "~/utils/helper";
import { ShowTopic } from "../../Candidate/ShowTopic";
import ResultBadge from "~/components/ResultBadge";
import useGetInfoJudge from "~/hooks/useGetInfoJudge";
import useAuth from "~/hooks/useAuth";
import { USER_ROLE } from "~/constants/enums";
import { NoteTeam } from "./Note";

const RoomDetail = () => {
    const { roomId, judgeId } = useParams<{ roomId: string; judgeId: string }>();

    const { data: team, isLoading } = useQuery({
        queryKey: ["judge", "room", roomId],
        queryFn: async () => {
            const res = await JudgeApi.getTeamsByRoom(roomId!, judgeId!);
            return res.result;
        },
        enabled: !!roomId,
        staleTime: 5 * 60 * 1000,
    });
    const { data } = useGetInfoJudge(judgeId!);
    const { user } = useAuth();
    if (isLoading) {
        return <Loading />;
    }

    if (!team) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500">Không tìm thấy thông tin nhóm</p>
                <Link to="/judge" className="mt-4">
                    <Button variant="outline">Quay lại</Button>
                </Link>
            </div>
        );
    }

    const candidates = team?.candidates || [];
    const leader = team?.leader;

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="mb-6">
                <HistorySubmit submissions={team?.submissions || []} isLoading={isLoading} />
            </section>
            {user.roles.includes(USER_ROLE.ADMIN) && (
                <section className="mb-2 ml-2">
                    <h2>Đang xem đánh giá của: {data?.fullName}</h2>
                </section>
            )}

            <section className="col-span-16" id="team-detail">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xs">
                    <div className="from-gray-100/60/60 flex flex-col gap-3 border-b border-gray-200 bg-linear-to-r px-4 py-3 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                    [NHÓM <span className="text-primary font-bold">{team.group}</span>] -{" "}
                                    {team.name ? (
                                        <span className="text-primary font-bold">{team.name}</span>
                                    ) : (
                                        <span className="text-gray-500 italic">Chưa đặt tên nhóm</span>
                                    )}
                                </h2>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                <span className="font-semibold">Đề tài:</span> {team.topic.title}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                Danh sách thành viên trong nhóm để chấm điểm.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                            <ShowTopic urlPdf={team.topic.filePath} name={team.topic.title} />
                            <NoteTeam note={team.noteJudges?.[0]?.note || ""} teamId={team.id} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                        STT
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3">
                                        Họ và tên
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3">
                                        MSSV
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                        Liên hệ
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:px-6 sm:py-3 md:table-cell">
                                        Trạng thái
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                {candidates.map((candidate, index) => {
                                    const isLeader = candidate.id === leader?.id;

                                    return (
                                        <tr key={candidate.id} className={`transition-colors hover:bg-gray-50/50`}>
                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                {index + 1}
                                            </td>
                                            <td
                                                className={`${isLeader ? "font-semibold text-gray-900" : "text-gray-700"} relative px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {candidate.user.fullName}
                                                    {isLeader && <BadgeLeader />}
                                                </div>
                                                <p className="mt-0.5 text-xs text-gray-600">Ngành: {candidate.major}</p>
                                                {candidate.statusC3 !== "WAITING" && (
                                                    <ResultBadge status={candidate.statusC3} isBg={false} />
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                                <p className="text-blue-gray-900 text-sm font-semibold">
                                                    {candidate.studentCode}
                                                </p>
                                                <p className="text-xs text-gray-500">Kỳ {candidate.semester}</p>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                                <div className="flex flex-col gap-1">
                                                    <span className="block font-medium">{candidate.user.email}</span>
                                                    <span className="block text-gray-500">{candidate.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                                {candidate.statusC3 !== "FAILED" && (
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <span className="text-gray-500">Điểm:</span>
                                                            <span
                                                                className={`font-semibold ${Helper.belowAverage(candidate.scoreJudge) ? "text-red-500" : "text-green-500"}`}
                                                            >
                                                                {candidate.scoreJudge || 0}
                                                            </span>
                                                            <span className="text-gray-500">/100</span>
                                                        </div>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-fit text-xs"
                                                            asChild
                                                        >
                                                            <Link
                                                                to={`/judge/room/${roomId}/judge/${judgeId}/team/${team.id}/candidate/${candidate.id}`}
                                                                className="flex items-center gap-1"
                                                            >
                                                                <Sparkles size={10} /> <span>Đánh giá</span>
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RoomDetail;
