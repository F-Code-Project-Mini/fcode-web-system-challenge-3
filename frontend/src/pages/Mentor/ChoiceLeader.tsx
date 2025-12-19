import { UserRound } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

export function ChoiceLeader() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="shadown-base flex w-fit cursor-pointer items-center gap-2 rounded-xl border p-2"
                >
                    <span>Thay đổi Leader</span>
                    <UserRound size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cập nhật leader cho nhóm</AlertDialogTitle>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a leader" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Leader</SelectLabel>
                                <SelectItem value="pham-hoang-tuan">[SE200947] - Phạm Hoàng Tuấn</SelectItem>
                                <SelectItem value="lam-hoang-an">[SE200948] - Lâm Hoàng An</SelectItem>
                                <SelectItem value="ho-le-thien-an">[SE200949] - Hồ Lê Thiên An</SelectItem>
                                <SelectItem value="ngo-ngoc-gia-han">[SE200950] - Ngô Ngọc Gia Hân</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction className="bg-black text-white">Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
