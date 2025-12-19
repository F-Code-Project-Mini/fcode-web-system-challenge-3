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
                <div className="rounded-xl border-2 bg-white p-2">
                    <NotebookPen size={20} />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ghi chú</AlertDialogTitle>

                    <Textarea placeholder="Ghi chú ...." />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction className="bg-black text-white">Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
