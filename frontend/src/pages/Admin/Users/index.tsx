import { useQuery } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AddUserDialog from "./AddUserDialog";
import { useNavigate } from "react-router";
import Loading from "~/components/Loading";
import type { AdminUserType } from "~/types/admin.types";
import type { RoleType } from "~/types/user.types";

const roleLabels: Record<RoleType, string> = {
    CANDIDATE: "Thí sinh",
    MENTOR: "Mentor",
    JUDGE: "Giám khảo",
    HOST: "Host",
    ADMIN: "Admin",
};

const roleColors: Record<RoleType, string> = {
    CANDIDATE: "bg-blue-100 text-blue-800",
    MENTOR: "bg-green-100 text-green-800",
    JUDGE: "bg-purple-100 text-purple-800",
    HOST: "bg-yellow-100 text-yellow-800",
    ADMIN: "bg-red-100 text-red-800",
};

const UsersPage = () => {
    const navigate = useNavigate();

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

    const renderUserCard = (user: AdminUserType) => (
        <Card key={user.id} className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold">{user.fullName}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                                <Badge key={role} className={roleColors[role]} variant="secondary">
                                    {roleLabels[role]}
                                </Badge>
                            ))}
                        </div>
                        {user.candidate && (
                            <div className="mt-2 text-sm text-gray-600">
                                <p>MSSV: {user.candidate.studentCode}</p>
                                {user.candidate.team && (
                                    <p>Nhóm: {user.candidate.team.name || `Nhóm ${user.candidate.team.group}`}</p>
                                )}
                            </div>
                        )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/admin/users/${user.id}`)}>
                        Chi tiết
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý Users</h1>
                <AddUserDialog />
            </div>

            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">Tất cả ({users?.length || 0})</TabsTrigger>
                    <TabsTrigger value="CANDIDATE">Thí sinh ({filterUsersByRole("CANDIDATE").length})</TabsTrigger>
                    <TabsTrigger value="MENTOR">Mentor ({filterUsersByRole("MENTOR").length})</TabsTrigger>
                    <TabsTrigger value="JUDGE">Giám khảo ({filterUsersByRole("JUDGE").length})</TabsTrigger>
                    <TabsTrigger value="HOST">Host ({filterUsersByRole("HOST").length})</TabsTrigger>
                    <TabsTrigger value="ADMIN">Admin ({filterUsersByRole("ADMIN").length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filterUsersByRole("all").map(renderUserCard)}
                    </div>
                </TabsContent>

                <TabsContent value="CANDIDATE" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filterUsersByRole("CANDIDATE").map(renderUserCard)}
                    </div>
                </TabsContent>

                <TabsContent value="MENTOR" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filterUsersByRole("MENTOR").map(renderUserCard)}
                    </div>
                </TabsContent>

                <TabsContent value="JUDGE" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filterUsersByRole("JUDGE").map(renderUserCard)}
                    </div>
                </TabsContent>

                <TabsContent value="HOST" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filterUsersByRole("HOST").map(renderUserCard)}
                    </div>
                </TabsContent>

                <TabsContent value="ADMIN" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filterUsersByRole("ADMIN").map(renderUserCard)}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UsersPage;
