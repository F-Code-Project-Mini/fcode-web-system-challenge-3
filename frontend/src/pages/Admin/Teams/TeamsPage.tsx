import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý Nhóm</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teams?.map((team: TeamType) => (
                    <Card key={team.id} className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{team.name || `Nhóm ${team.group}`}</span>
                                <Badge variant="outline">#{team.group}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Đề tài</label>
                                    <p className="text-sm">{team.topic?.title || "Chưa có đề tài"}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Mentor</label>
                                    <p className="text-sm">{team.mentorship?.mentor?.fullName || "Chưa có mentor"}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Thành viên</label>
                                    <p className="text-sm">{team.candidates?.length || 0} người</p>
                                </div>

                                {team.schedulePresent && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Lịch thử nghiệm</label>
                                        <p className="text-sm">{team.schedulePresent.trialDate}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminTeamsPage;
