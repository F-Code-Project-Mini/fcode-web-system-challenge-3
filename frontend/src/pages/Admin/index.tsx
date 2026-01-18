import { useQuery } from "@tanstack/react-query";
import Teams from "./Team";
import TeamApi from "~/api-requests/team.requests";
import AdminApi from "~/api-requests/admin.requests";
import { ArrowRight } from "lucide-react";
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
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Trang Quản Trị</h1>
                <p className="mb-6 text-sm text-gray-600">Tổng quan hệ thống và quản lý dữ liệu</p>

                <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 [&>div]:bg-white">
                    <div
                        onClick={() => navigate("/admin/users")}
                        className="cursor-pointer rounded-xl border border-gray-300 px-4 py-3"
                    >
                        <h4 className="text-xs text-gray-500">Quản lý Users</h4>
                        <span className="mt-2 inline-block text-4xl font-bold text-gray-900">{users?.length || 0}</span>
                        <div className="text-primary mt-2 flex items-center gap-1 text-xs font-medium">
                            Xem chi tiết
                            <ArrowRight className="h-3 w-3 transition-transform" />
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/admin/rooms")}
                        className="cursor-pointer rounded-xl border border-gray-300 px-4 py-3"
                    >
                        <h4 className="text-xs text-gray-500">Quản lý Phòng</h4>
                        <span className="mt-2 inline-block text-4xl font-bold text-gray-900">{rooms?.length || 0}</span>
                        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-teal-600">
                            Xem chi tiết
                            <ArrowRight className="h-3 w-3 transition-transform" />
                        </div>
                    </div>

                    <div
                        onClick={() => navigate("/admin/teams")}
                        className="cursor-pointer rounded-xl border border-gray-300 px-4 py-3"
                    >
                        <h4 className="text-xs text-gray-500">Quản lý Nhóm</h4>
                        <span className="mt-2 inline-block text-4xl font-bold text-gray-900">{teams?.length || 0}</span>
                        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-teal-600">
                            Xem chi tiết
                            <ArrowRight className="h-3 w-3 transition-transform" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
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
