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

const AddUserDialog = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const queryClient = useQueryClient();

    const createUserMutation = useMutation({
        mutationFn: (data: { email: string; fullName: string }) => AdminApi.createUser(data),
        onSuccess: (response) => {
            alert(`Tạo user thành công! Password mặc định: ${response.result.defaultPassword}`);
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
            setOpen(false);
            setEmail("");
            setFullName("");
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || "Có lỗi xảy ra!");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !fullName) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        createUserMutation.mutate({ email, fullName });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Thêm User</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Thêm User Mới</DialogTitle>
                        <DialogDescription>Nhập thông tin user. Password mặc định là: 123456aA</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="user@example.com"
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
