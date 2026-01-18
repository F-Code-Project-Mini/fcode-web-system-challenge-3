import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import { Badge } from "~/components/ui/badge";
import Loading from "~/components/Loading";
import type { TeamType } from "~/types/team.types";

const AdminTeamsPage = () => {
    const { data: teams, isLoading } = useQuery({
        queryKey: ["admin", "teams"],
        queryFn: async () => {
            const res = await TeamApi.getAllTeams();
            return res.result;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Nhóm</h1>
                <p className="mt-2 text-sm text-gray-600">Xem danh sách các nhóm tham gia cuộc thi</p>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                Danh sách Nhóm ({teams?.length || 0})
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                                Thông tin các nhóm tham gia và tiến độ thực hiện
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
                                    Nhóm
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Đề tài
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Mentor
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Thành viên
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                    Lịch thử nghiệm
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 bg-white">
                            {teams?.map((team: TeamType, index) => (
                                <tr key={team.id} className="transition-colors hover:bg-gray-50/50">
                                    <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">
                                                {team.name || `Nhóm ${team.group}`}
                                            </span>
                                            <Badge variant="outline" className="text-xs">
                                                #{team.group}
                                            </Badge>
                                        </div>
                                        {!team.name && <p className="mt-0.5 text-xs text-red-500">Chưa đặt tên nhóm</p>}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 sm:px-6 sm:py-4">
                                        <p className="max-w-xs truncate" title={team.topic?.title}>
                                            {team.topic?.title || <span className="text-gray-400">Chưa có đề tài</span>}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 sm:px-6 sm:py-4">
                                        {team.mentorship?.mentor?.fullName || (
                                            <span className="text-gray-400">Chưa có mentor</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 sm:px-6 sm:py-4">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                            {team.candidates?.length || 0} người
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 sm:px-6 sm:py-4">
                                        {team.schedulePresent?.trialDate ? (
                                            <span className="text-xs font-medium">
                                                {team.schedulePresent.trialDate}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">Chưa đăng ký</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminTeamsPage;
