import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";
import Loading from "~/components/Loading";
import WelcomePartition from "~/components/WelcomePartition";
import BadgeLeader from "~/components/BadgeLeader";
import { Button } from "~/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

const RoomDetail = () => {
    const { roomId } = useParams<{ roomId: string }>();

    const { data: team, isLoading } = useQuery({
        queryKey: ["judge", "room", roomId],
        queryFn: async () => {
            const res = await JudgeApi.getTeamsByRoom(roomId!);
            return res.result;
        },
        enabled: !!roomId,
        staleTime: 5 * 60 * 1000,
    });

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

            <section className="mb-4">
                <Link to="/judge">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-all hover:shadow-md"
                    >
                        <ArrowLeft size={16} />
                        <span>Quay lại danh sách phòng</span>
                    </Button>
                </Link>
            </section>

            <section className="col-span-16" id="team-detail">
                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                        [NHÓM <span className="text-primary font-bold">{team.group}</span>] -{" "}
                                        {team.name ? (
                                            <span className="text-primary font-bold">{team.name}</span>
                                        ) : (
                                            <span className="text-gray-500">Chưa đặt tên nhóm</span>
                                        )}
                                    </h2>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                                    <span className="font-semibold">Đề tài:</span> {team.topic.title}
                                </p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                                    Danh sách thành viên trong nhóm để chấm điểm.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        STT
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Họ và tên
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3.5">
                                        MSSV
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                        Liên hệ
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                {candidates.map((candidate, index) => {
                                    const isLeader = candidate.id === leader?.id;
                                    return (
                                        <tr key={candidate.id} className="transition-colors hover:bg-gray-50/50">
                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                {index + 1}
                                            </td>
                                            <td
                                                className={`${isLeader ? "font-semibold text-gray-900" : "text-gray-700"} px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {candidate.user.fullName}
                                                    {isLeader && <BadgeLeader />}
                                                </div>
                                                <p className="mt-0.5 text-xs text-gray-600">Ngành: {candidate.major}</p>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                                <p className="text-blue-gray-900 text-sm font-semibold">
                                                    {candidate.studentCode}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                                <div className="space-y-1">
                                                    <p className="text-xs">
                                                        <span className="font-medium">Email:</span>{" "}
                                                        {candidate.user.email}
                                                    </p>
                                                    <p className="text-xs">
                                                        <span className="font-medium">SĐT:</span> {candidate.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                <Link to={`/judge/barem/${candidate.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-all hover:shadow-md"
                                                    >
                                                        <span>Đánh giá</span>
                                                        <Sparkles size={16} />
                                                    </Button>
                                                </Link>
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
