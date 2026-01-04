import { Check, NotebookPen } from "lucide-react";
import { useState } from "react";
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

export function Note({ note }: { note?: string }) {
    const [noteValue, setNoteValue] = useState(note || "");
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="relative rounded-xl border-2 bg-white p-2">
                    {note ? (
                        <div className="absolute -top-2 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-white">
                            <Check />
                        </div>
                    ) : null}
                    <NotebookPen size={20} />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ghi chú</AlertDialogTitle>

                    <Textarea
                        placeholder="Ghi chú ...."
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                        className="min-h-[120px] text-base"
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction className="bg-black text-white">Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
