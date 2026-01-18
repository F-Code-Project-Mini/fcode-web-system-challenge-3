import { useQuery } from "@tanstack/react-query";
import Teams from "./Team";
import TeamApi from "~/api-requests/team.requests";
import AdminApi from "~/api-requests/admin.requests";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Users, DoorOpen, UsersRound } from "lucide-react";
import { useNavigate } from "react-router";

const AdminPage = () => {
    const navigate = useNavigate();

    const { data: teams } = useQuery({
        queryKey: ["admin", "teams"],
        queryFn: async () => {
            const res = await TeamApi.getAllTeams();
            return res.result;
        },
        staleTime: 5 * 60 * 1000,
    });

    const { data: users } = useQuery({
        queryKey: ["admin", "users"],
        queryFn: async () => {
            const res = await AdminApi.getAllUsers();
            return res.result;
        },
        staleTime: 5 * 60 * 1000,
    });

    const { data: rooms } = useQuery({
        queryKey: ["admin", "rooms"],
        queryFn: async () => {
            const res = await AdminApi.getAllRooms();
            return res.result;
        },
        staleTime: 5 * 60 * 1000,
    });

    return (
        <>
            <section className="mt-4 mb-6">
                <h1 className="mb-6 text-3xl font-bold">Trang Quản Trị</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card
                        className="cursor-pointer transition-shadow hover:shadow-lg"
                        onClick={() => navigate("/admin/users")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Quản lý Users</CardTitle>
                            <Users className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users?.length || 0}</div>
                            <p className="mt-1 text-xs text-gray-500">Tổng số người dùng</p>
                            <Button variant="link" className="mt-2 h-auto p-0">
                                Xem chi tiết →
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer transition-shadow hover:shadow-lg"
                        onClick={() => navigate("/admin/rooms")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Quản lý Phòng Chấm</CardTitle>
                            <DoorOpen className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{rooms?.length || 0}</div>
                            <p className="mt-1 text-xs text-gray-500">Tổng số phòng</p>
                            <Button variant="link" className="mt-2 h-auto p-0">
                                Xem chi tiết →
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer transition-shadow hover:shadow-lg"
                        onClick={() => navigate("/admin/teams")}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Quản lý Nhóm</CardTitle>
                            <UsersRound className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{teams?.length || 0}</div>
                            <p className="mt-1 text-xs text-gray-500">Tổng số nhóm</p>
                            <Button variant="link" className="mt-2 h-auto p-0">
                                Xem chi tiết →
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="mb-4 text-2xl font-semibold">Danh sách Nhóm</h2>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                    {teams?.map((item) => (
                        <Teams key={item.id} team={item} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default AdminPage;
