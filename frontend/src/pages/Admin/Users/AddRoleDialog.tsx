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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import type { RoleType } from "~/types/user.types";
import { Plus } from "lucide-react";

interface AddRoleDialogProps {
    userId: string;
}

const roles: { value: RoleType; label: string }[] = [
    { value: "CANDIDATE", label: "Thí sinh" },
    { value: "MENTOR", label: "Mentor" },
    { value: "JUDGE", label: "Giám khảo" },
    { value: "HOST", label: "Host" },
    { value: "ADMIN", label: "Admin" },
];

const AddRoleDialog = ({ userId }: AddRoleDialogProps) => {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleType | "">("");
    const queryClient = useQueryClient();

    const addRoleMutation = useMutation({
        mutationFn: (data: { role: RoleType }) => AdminApi.addRoleToUser(userId, data),
        onSuccess: () => {
            alert("Thêm role thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "user", userId] });
            setOpen(false);
            setSelectedRole("");
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || "Có lỗi xảy ra!");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) {
            alert("Vui lòng chọn role!");
            return;
        }
        addRoleMutation.mutate({ role: selectedRole });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <Plus className="mr-1 h-4 w-4" />
                    Thêm Role
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Thêm Role cho User</DialogTitle>
                        <DialogDescription>Chọn role muốn thêm cho user này.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as RoleType)}>
                                <SelectTrigger>
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
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={addRoleMutation.isPending}>
                            {addRoleMutation.isPending ? "Đang thêm..." : "Thêm Role"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRoleDialog;
