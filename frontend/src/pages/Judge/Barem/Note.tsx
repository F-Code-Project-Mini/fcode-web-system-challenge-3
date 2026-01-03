import { NotebookPen } from "lucide-react";
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
import { Textarea } from "~/components/ui/textarea";

export function Note() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="hover:border-primary hover:bg-primary/5 hover:text-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-xs transition-all hover:shadow-xs">
                    <NotebookPen size={18} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold tracking-tight">Ghi chú</AlertDialogTitle>
                    <div className="pt-4">
                        <Textarea placeholder="Nhập ghi chú của bạn..." className="min-h-[120px]" />
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction>Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
