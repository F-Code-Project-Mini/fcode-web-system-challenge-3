import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import AdminApi from "~/api-requests/admin.requests";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Loading from "~/components/Loading";
import AddRoleDialog from "./AddRoleDialog";
import {
    ArrowLeft,
    Trash2,
    User,
    Mail,
    Calendar,
    Phone,
    GraduationCap,
    Users,
    Facebook,
    MessageSquare,
} from "lucide-react";
import type { RoleType } from "~/types/user.types";
import Helper from "~/utils/helper";
import Notification from "~/utils/notification";

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
            Notification.success({ text: "Xóa role thành công!" });
            queryClient.invalidateQueries({ queryKey: ["admin", "user", id] });
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            Notification.error({ text: err.response?.data?.message || "Có lỗi xảy ra!" });
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

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
                <p className="mt-2 text-sm text-gray-600">Chi tiết thông tin người dùng</p>
            </div>

            <div className="grid gap-6">
                {/* Thông tin cơ bản */}
                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                        <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                            Thông tin cơ bản
                        </h3>
                    </div>
                    <div className="px-5 py-4 sm:px-6 sm:py-5">
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <User className="h-4 w-4" />
                                    Họ và tên
                                </dt>
                                <dd className="mt-1 text-base font-semibold text-gray-900">{user.fullName}</dd>
                            </div>
                            <div>
                                <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <Mail className="h-4 w-4" />
                                    Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-700">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    Ngày tạo
                                </dt>
                                <dd className="mt-1 text-sm text-gray-700">{Helper.formatDate(user.createdAt)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Roles */}
                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                Phân quyền ({user.roles.length})
                            </h3>
                            <AddRoleDialog userId={user.id} />
                        </div>
                    </div>
                    <div className="px-5 py-4 sm:px-6 sm:py-5">
                        {user.roles.length === 0 ? (
                            <p className="text-sm text-gray-500">Chưa có role nào</p>
                        ) : (
                            <div className="space-y-2">
                                {user.roles.map((roleItem) => (
                                    <div
                                        key={roleItem.roleId}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/30 p-3 transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Badge className={roleColors[roleItem.role]} variant="secondary">
                                                {roleLabels[roleItem.role]}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                Thêm vào: {Helper.formatDate(roleItem.assignedAt)}
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => removeRoleMutation.mutate({ roleId: roleItem.roleId })}
                                            disabled={removeRoleMutation.isPending}
                                            className="hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Thông tin thí sinh */}
                {user.candidate && (
                    <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                        <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                            <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                Thông tin thí sinh
                            </h3>
                        </div>
                        <div className="px-5 py-4 sm:px-6 sm:py-5">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                        <GraduationCap className="h-4 w-4" />
                                        Mã sinh viên
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                                        {user.candidate.studentCode}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                        <Phone className="h-4 w-4" />
                                        Số điện thoại
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-700">{user.candidate.phone}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Ngành</dt>
                                    <dd className="mt-1 text-sm text-gray-700">{user.candidate.major}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Học kỳ</dt>
                                    <dd className="mt-1 text-sm text-gray-700">Kỳ {user.candidate.semester}</dd>
                                </div>
                                {user.candidate.team && (
                                    <div className="sm:col-span-2">
                                        <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                            <Users className="h-4 w-4" />
                                            Nhóm
                                        </dt>
                                        <dd className="mt-1">
                                            <Badge variant="outline" className="text-sm">
                                                {user.candidate.team.name || `Nhóm ${user.candidate.team.group}`}
                                            </Badge>
                                            {user.candidate.team.topic && (
                                                <p className="mt-1 text-xs text-gray-600">
                                                    {user.candidate.team.topic.title}
                                                </p>
                                            )}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                )}

                {/* Thông tin Mentor */}
                {user.mentorships.length > 0 && (
                    <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                        <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                            <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                Thông tin Mentor
                            </h3>
                        </div>
                        <div className="px-5 py-4 sm:px-6 sm:py-5">
                            <div className="space-y-4">
                                {user.mentorships.map((mentorship) => (
                                    <div
                                        key={mentorship.id}
                                        className="rounded-lg border border-gray-200 bg-gray-50/30 p-4"
                                    >
                                        <dl className="grid gap-3 sm:grid-cols-2">
                                            <div>
                                                <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                    <Facebook className="h-4 w-4" />
                                                    Facebook
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-700">{mentorship.facebook}</dd>
                                            </div>
                                            <div>
                                                <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                    <MessageSquare className="h-4 w-4" />
                                                    Discord
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-700">{mentorship.discord}</dd>
                                            </div>
                                            <div>
                                                <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                    <Phone className="h-4 w-4" />
                                                    Số điện thoại
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-700">{mentorship.phone}</dd>
                                            </div>
                                            {mentorship.teams.length > 0 && (
                                                <div className="sm:col-span-2">
                                                    <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                        <Users className="h-4 w-4" />
                                                        Các nhóm hướng dẫn ({mentorship.teams.length})
                                                    </dt>
                                                    <dd className="mt-2 flex flex-wrap gap-2">
                                                        {mentorship.teams.map((team) => (
                                                            <Badge key={team.id} variant="outline" className="bg-white">
                                                                {team.name || `Nhóm ${team.group}`}
                                                            </Badge>
                                                        ))}
                                                    </dd>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Phòng chấm (Judge) */}
                {user.judgeRooms.length > 0 && (
                    <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                        <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                            <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                Phòng chấm ({user.judgeRooms.length})
                            </h3>
                        </div>
                        <div className="px-5 py-4 sm:px-6 sm:py-5">
                            <div className="flex flex-wrap gap-2">
                                {user.judgeRooms.map((jr) => (
                                    <Badge
                                        key={jr.room.id}
                                        variant="outline"
                                        className="border-purple-200 bg-purple-50 text-purple-700"
                                    >
                                        Phòng {jr.room.roomNumber} -{" "}
                                        {jr.room.presentPhase === "TRIAL" ? "Thử nghiệm" : "Chính thức"}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailPage;
