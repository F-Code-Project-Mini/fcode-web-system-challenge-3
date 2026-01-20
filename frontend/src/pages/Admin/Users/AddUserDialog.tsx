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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import Notification from "~/utils/notification";
import { X } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
const roles: { value: number; label: string }[] = [
    { value: 1, label: "Thí sinh" },
    { value: 2, label: "Mentor" },
    { value: 3, label: "Giám khảo" },
    { value: 4, label: "Host" },
    { value: 5, label: "Admin" },
];

const AddUserDialog = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<number[]>([1]);
    const queryClient = useQueryClient();

    const createUserMutation = useMutation({
        mutationFn: (data: { email: string; fullName: string; role: number[] }) => AdminApi.createUser(data),
        onSuccess: async () => {
            Notification.success({
                text: `Tạo user thành công!`,
            });
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
            setOpen(false);
            setEmail("");
            setFullName("");
            setSelectedRoles([1]);
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            Notification.error({ text: err.response?.data?.message || "Có lỗi xảy ra!" });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !fullName || selectedRoles.length === 0) {
            Notification.error({ text: "Vui lòng nhập đầy đủ thông tin và chọn ít nhất 1 role!" });
            return;
        }
        createUserMutation.mutate({ email, fullName, role: selectedRoles });
    };

    const toggleRole = (roleValue: number) => {
        setSelectedRoles((prev) =>
            prev.includes(roleValue) ? prev.filter((r) => r !== roleValue) : [...prev, roleValue],
        );
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
                            <Label htmlFor="role">Role</Label>
                            <div className="flex flex-wrap gap-2">
                                {selectedRoles.length > 0 ? (
                                    selectedRoles.map((roleValue) => {
                                        const role = roles.find((r) => r.value === roleValue);
                                        return (
                                            <span
                                                key={roleValue}
                                                className="bg-primary flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-white"
                                            >
                                                {role?.label}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleRole(roleValue)}
                                                    className="hover:bg-primary/80 rounded-full"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        );
                                    })
                                ) : (
                                    <span className="text-xs text-gray-400">Chưa chọn role nào</span>
                                )}
                            </div>
                            <div className="mt-2 space-y-2 rounded-md border border-gray-200 p-3">
                                {roles.map((role) => (
                                    <label key={role.value} className="flex cursor-pointer items-center gap-2 text-sm">
                                        <Checkbox
                                            checked={selectedRoles.includes(role.value)}
                                            onCheckedChange={() => toggleRole(role.value)}
                                            className="text-primary focus:ring-primary h-4 w-4 cursor-pointer rounded border-gray-300"
                                        />
                                        <span>{role.label}</span>
                                    </label>
                                ))}
                            </div>
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
