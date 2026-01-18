import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import AdminApi from "~/api-requests/admin.requests";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Loading from "~/components/Loading";
import AddRoleDialog from "./AddRoleDialog";
import { ArrowLeft, Trash2 } from "lucide-react";
import type { RoleType } from "~/types/user.types";
import Helper from "~/utils/helper";

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

const UserDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ["admin", "user", id],
        queryFn: async () => {
            const res = await AdminApi.getUserById(id!);
            return res.result;
        },
        enabled: !!id,
    });

    const removeRoleMutation = useMutation({
        mutationFn: ({ roleId }: { roleId: number }) => AdminApi.removeRoleFromUser(id!, roleId),
        onSuccess: () => {
            alert("Xóa role thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin", "user", id] });
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || "Có lỗi xảy ra!");
        },
    });

    if (isLoading) return <Loading />;
    if (!user) return <div>Không tìm thấy user</div>;

    return (
        <div className="container mx-auto py-6">
            <Button variant="ghost" onClick={() => navigate("/admin/users")} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại
            </Button>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin cơ bản</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                                <p className="text-lg">{user.fullName}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                                <p>{Helper.formatDate(user.createdAt)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Roles</CardTitle>
                        <AddRoleDialog userId={user.id} />
                    </CardHeader>
                    <CardContent>
                        {user.roles.length === 0 ? (
                            <p className="text-gray-500">Chưa có role nào</p>
                        ) : (
                            <div className="space-y-3">
                                {user.roles.map((roleItem) => (
                                    <div
                                        key={roleItem.roleId}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Badge className={roleColors[roleItem.role]} variant="secondary">
                                                {roleLabels[roleItem.role]}
                                            </Badge>
                                            <span className="text-sm text-gray-500">
                                                Thêm vào: {Helper.formatDate(roleItem.assignedAt)}
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => removeRoleMutation.mutate({ roleId: roleItem.roleId })}
                                            disabled={removeRoleMutation.isPending}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {user.candidate && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin thí sinh</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Mã sinh viên</label>
                                    <p>{user.candidate.studentCode}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                                    <p>{user.candidate.phone}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Ngành</label>
                                    <p>{user.candidate.major}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Học kỳ</label>
                                    <p>{user.candidate.semester}</p>
                                </div>
                                {user.candidate.team && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nhóm</label>
                                        <p>
                                            {user.candidate.team.name || `Nhóm ${user.candidate.team.group}`}
                                            {user.candidate.team.topic && ` - ${user.candidate.team.topic.title}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {user.mentorships.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin Mentor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {user.mentorships.map((mentorship) => (
                                    <div key={mentorship.id} className="rounded-lg border p-4">
                                        <div className="grid gap-2">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Facebook</label>
                                                <p>{mentorship.facebook}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">Discord</label>
                                                <p>{mentorship.discord}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">
                                                    Số điện thoại
                                                </label>
                                                <p>{mentorship.phone}</p>
                                            </div>
                                            {mentorship.teams.length > 0 && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">
                                                        Các nhóm hướng dẫn
                                                    </label>
                                                    <div className="mt-1 flex flex-wrap gap-2">
                                                        {mentorship.teams.map((team) => (
                                                            <Badge key={team.id} variant="outline">
                                                                {team.name || `Nhóm ${team.group}`}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {user.judgeRooms.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Phòng chấm (Judge)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {user.judgeRooms.map((jr) => (
                                    <Badge key={jr.room.id} variant="outline">
                                        {jr.room.roomNumber} - {jr.room.presentPhase}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default UserDetailPage;
