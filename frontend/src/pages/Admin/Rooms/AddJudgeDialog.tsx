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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import { Plus } from "lucide-react";
import type { JudgeUserType } from "~/types/admin.types";

interface AddJudgeDialogProps {
    roomId: string;
}

const AddJudgeDialog = ({ roomId }: AddJudgeDialogProps) => {
    const [open, setOpen] = useState(false);
    const [selectedJudge, setSelectedJudge] = useState<string>("");
    const queryClient = useQueryClient();

    const { data: judges } = useQuery({
        queryKey: ["admin", "judges"],
        queryFn: async () => {
            const res = await AdminApi.getJudgeUsers();
            return res.result;
        },
    });

    const addJudgeMutation = useMutation({
        mutationFn: (data: { judgeId: string }) => AdminApi.addJudgeToRoom(roomId, data),
        onSuccess: () => {
            alert("Thêm judge vào phòng thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin", "rooms"] });
            setOpen(false);
            setSelectedJudge("");
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || "Có lỗi xảy ra!");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJudge) {
            alert("Vui lòng chọn judge!");
            return;
        }
        addJudgeMutation.mutate({ judgeId: selectedJudge });
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
                        <DialogDescription>Chọn judge muốn thêm vào phòng này.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="judge">Judge</Label>
                            <Select value={selectedJudge} onValueChange={setSelectedJudge}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn judge" />
                                </SelectTrigger>
                                <SelectContent>
                                    {judges?.map((judge: JudgeUserType) => (
                                        <SelectItem key={judge.id} value={judge.id}>
                                            {judge.fullName} ({judge.email})
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
