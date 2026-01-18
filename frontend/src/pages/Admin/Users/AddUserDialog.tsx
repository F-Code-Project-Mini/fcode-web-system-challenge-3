import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import type { RoleType } from "~/types/user.types";
import Notification from "~/utils/notification";

const roles: { value: RoleType; label: string }[] = [
    { value: "CANDIDATE", label: "Thí sinh" },
    { value: "MENTOR", label: "Mentor" },
    { value: "JUDGE", label: "Giám khảo" },
    { value: "HOST", label: "Host" },
    { value: "ADMIN", label: "Admin" },
];

const AddUserDialog = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [selectedRole, setSelectedRole] = useState<RoleType>("CANDIDATE");
    const queryClient = useQueryClient();

    const createUserMutation = useMutation({
        mutationFn: (data: { email: string; fullName: string }) => AdminApi.createUser(data),
        onSuccess: async (response) => {
            if (selectedRole) {
                try {
                    await AdminApi.addRoleToUser(response.result.id, { role: selectedRole });
                    Notification.success({
                        text: `Tạo user thành công! Password mặc định: ${response.result.defaultPassword}`,
                    });
                } catch {
                    Notification.error({
                        text: `Tạo user thành công nhưng thêm role thất bại. Password: ${response.result.defaultPassword}`,
                    });
                }
            } else {
                Notification.success({
                    text: `Tạo user thành công! Password mặc định: ${response.result.defaultPassword}`,
                });
            }
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
            setOpen(false);
            setEmail("");
            setFullName("");
            setSelectedRole("CANDIDATE");
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            Notification.error({ text: err.response?.data?.message || "Có lỗi xảy ra!" });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !fullName) {
            Notification.error({ text: "Vui lòng nhập đầy đủ thông tin!" });
            return;
        }
        createUserMutation.mutate({ email, fullName });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Thêm người dùng</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Thêm người dùng mới</DialogTitle>
                        <DialogDescription>Nhập thông tin người dùng.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="phamhoangtuanqn@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input
                                id="fullName"
                                placeholder="Nguyễn Văn A"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as RoleType)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* <p className="text-xs text-gray-500">Có thể thêm role sau khi tạo user</p> */}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={createUserMutation.isPending}>
                            {createUserMutation.isPending ? "Đang tạo..." : "Tạo User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserDialog;
