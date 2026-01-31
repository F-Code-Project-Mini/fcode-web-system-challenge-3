import { useQuery } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AddUserDialog from "./AddUserDialog";
import Loading from "~/components/Loading";
import type { AdminUserType } from "~/types/admin.types";
import type { RoleType } from "~/types/user.types";
import BadgeRole from "~/components/BadgeRole";
import Helper from "~/utils/helper";
import { Medal, Trophy } from "lucide-react";

const UsersPage = () => {
    const { data: users, isLoading } = useQuery({
        queryKey: ["admin", "users"],
        queryFn: async () => {
            const res = await AdminApi.getAllUsers();
            return res.result;
        },
    });

    if (isLoading) return <Loading />;

    const filterUsersByRole = (role: RoleType | "all") => {
        if (!users) return [];
        if (role === "all") return users;
        return users.filter((user) => user.roles.includes(role));
    };

    const renderTable = (filteredUsers: AdminUserType[]) => (
        <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
            <div className="border-b border-gray-200/70 bg-linear-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                            Danh sách Users
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                            Quản lý users và phân quyền trong hệ thống
                        </p>
                    </div>
                    <AddUserDialog />
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
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                Email
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                Thông tin
                            </th>
                            <th className="px-4 py-3 text-end text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                Roles
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/60 bg-white">
                        {filteredUsers.map((user, index) => {
                            return (
                                <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                                    <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap sm:px-6 sm:py-4">
                                        <BadgeWinner rank={index + 1} />
                                    </td>
                                    <td
                                        className={`px-4 py-3.5 text-sm whitespace-nowrap text-gray-700 sm:px-6 sm:py-4`}
                                    >
                                        <div className="flex items-center gap-2">{user.fullName}</div>
                                        {user.candidate?.major && (
                                            <p className="mt-0.5 text-xs text-gray-600">
                                                Ngành: {user.candidate?.major}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 sm:px-6 sm:py-4">{user.email}</td>

                                    <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                        {user.candidate ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">Mentor:</span>
                                                    {user.mentorScore !== null ? (
                                                        <>
                                                            <span
                                                                className={`font-semibold ${Helper.belowAverage(user.mentorScore) ? "text-red-500" : "text-green-600"}`}
                                                            >
                                                                {user.mentorScore.toFixed(1)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">Present Offical:</span>
                                                    {user.avgPresentScore !== null ? (
                                                        <>
                                                            <span
                                                                className={`font-semibold ${Helper.belowAverage(user.avgPresentScore) ? "text-red-500" : "text-green-600"}`}
                                                            >
                                                                {user.avgPresentScore.toFixed(1)}
                                                            </span>
                                                            <span className="text-xs font-bold">/100</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500">Total:</span>

                                                    <>
                                                        <span
                                                            className={`font-semibold ${Helper.belowAverage(((user.avgPresentScore ?? 0) + (user.mentorScore ?? 0)) / 2) ? "text-red-500" : "text-green-600"}`}
                                                        >
                                                            {user.total}
                                                        </span>
                                                    </>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                        <div className="flex flex-wrap justify-end gap-1">
                                            {user.roles.length > 0 ? (
                                                user.roles.map((role) => <BadgeRole key={role} role={role} />)
                                            ) : (
                                                <span className="text-xs text-gray-400">Chưa có role</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Users</h1>
                <p className="mt-2 text-sm text-gray-600">Quản lý tài khoản người dùng và phân quyền trong hệ thống</p>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5 border border-gray-200 bg-white">
                    <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                        Tất cả ({users?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger
                        value="CANDIDATE"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Thí sinh ({filterUsersByRole("CANDIDATE").length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="MENTOR"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Mentor ({filterUsersByRole("MENTOR").length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="JUDGE"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Giám khảo ({filterUsersByRole("JUDGE").length})
                    </TabsTrigger>

                    <TabsTrigger
                        value="ADMIN"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Admin ({filterUsersByRole("ADMIN").length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all">{renderTable(filterUsersByRole("all"))}</TabsContent>
                <TabsContent value="CANDIDATE">{renderTable(filterUsersByRole("CANDIDATE"))}</TabsContent>
                <TabsContent value="MENTOR">{renderTable(filterUsersByRole("MENTOR"))}</TabsContent>
                <TabsContent value="JUDGE">{renderTable(filterUsersByRole("JUDGE"))}</TabsContent>
                <TabsContent value="ADMIN">{renderTable(filterUsersByRole("ADMIN"))}</TabsContent>
            </Tabs>
        </div>
    );
};
const BadgeWinner = ({ rank }: { rank: number }) => {
    const rankConfig: Record<
        number,
        {
            container: string;
            icon: React.ReactNode;
            textColor: string;
        }
    > = {
        1: {
            container: "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 shadow-amber-100",
            icon: <Trophy className="h-4 w-4 text-amber-600" />,
            textColor: "text-amber-700",
        },
        2: {
            container: "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 shadow-slate-100",
            icon: <Medal className="h-4 w-4 text-slate-500" />,
            textColor: "text-slate-600",
        },
        3: {
            container: "bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 shadow-orange-100",
            icon: <Medal className="h-4 w-4 text-orange-600" />,
            textColor: "text-orange-700",
        },
    };

    const config = rankConfig[rank];

    if (!config) {
        return <div className="flex h-8 w-8 items-center justify-center font-semibold text-gray-400">{rank}</div>;
    }

    return (
        <div
            className={`flex h-9 w-9 cursor-default items-center justify-center rounded-xl border shadow-sm transition-transform hover:scale-110 ${config.container} `}
        >
            <div className="flex flex-col items-center leading-none">
                {config.icon}
                <span className={`text-[10px] font-bold ${config.textColor}`}>{rank}</span>
            </div>
        </div>
    );
};
export default UsersPage;
