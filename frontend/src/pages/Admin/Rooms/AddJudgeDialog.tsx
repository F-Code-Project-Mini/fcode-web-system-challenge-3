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
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import { Plus } from "lucide-react";
import type { JudgeUserType } from "~/types/admin.types";
import Notification from "~/utils/notification";

interface AddJudgeDialogProps {
    roomId: string;
}

const AddJudgeDialog = ({ roomId }: AddJudgeDialogProps) => {
    const [open, setOpen] = useState(false);
    const [selectedJudges, setSelectedJudges] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const { data: judges } = useQuery({
        queryKey: ["admin", "judges"],
        queryFn: async () => {
            const res = await AdminApi.getJudgeUsers();
            return res.result;
        },
    });

    const addJudgeMutation = useMutation({
        mutationFn: (data: { judgeIds: string[] }) => AdminApi.addJudgeToRoom(roomId, data),
        onSuccess: () => {
            Notification.success({ text: "Thêm judges vào phòng thành công!" });
            queryClient.invalidateQueries({ queryKey: ["admin", "rooms"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "room-detail", roomId] });
            setOpen(false);
            setSelectedJudges([]);
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            Notification.error({ text: err.response?.data?.message || "Có lỗi xảy ra!" });
        },
    });

    const handleToggleJudge = (judgeId: string) => {
        setSelectedJudges((prev) =>
            prev.includes(judgeId) ? prev.filter((id) => id !== judgeId) : [...prev, judgeId],
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedJudges.length === 0) {
            Notification.error({ text: "Vui lòng chọn ít nhất một judge!" });
            return;
        }
        addJudgeMutation.mutate({ judgeIds: selectedJudges });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <Plus className="mr-1 h-4 w-4" />
                    Thêm Judge
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Thêm Judge vào Phòng</DialogTitle>
                        <DialogDescription>
                            Chọn các judges muốn thêm vào phòng này ({selectedJudges.length} đã chọn).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Danh sách Judges</Label>
                            <div className="max-h-[300px] space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3">
                                {judges?.map((judge: JudgeUserType) => (
                                    <div
                                        key={judge.id}
                                        className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-gray-50"
                                    >
                                        <Checkbox
                                            id={judge.id}
                                            checked={selectedJudges.includes(judge.id)}
                                            onCheckedChange={() => handleToggleJudge(judge.id)}
                                        />
                                        <label
                                            htmlFor={judge.id}
                                            className="flex-1 cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {judge.fullName}
                                            <span className="ml-2 text-xs text-gray-500">({judge.email})</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={addJudgeMutation.isPending}>
                            {addJudgeMutation.isPending ? "Đang thêm..." : "Thêm Judge"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddJudgeDialog;
