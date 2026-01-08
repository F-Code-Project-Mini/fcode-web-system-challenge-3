import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Check, NotebookPen } from "lucide-react";
import { useState } from "react";
import MentorApi from "~/api-requests/mentor.requests";

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
import Notification from "~/utils/notification";
type NoteProps = {
    note: string;
    teamId: string;
};
export function NoteTeam({ note, teamId }: NoteProps) {
    const [noteValue, setNoteValue] = useState(note || "");
    const noteUpdateMutation = useMutation({
        mutationKey: ["update-mentor-note", teamId],
        mutationFn: (newNote: string) => MentorApi.updateNoteTeam(teamId, newNote),
        onSuccess: () => {
            Notification.success({
                text: "Thay đổi ghi chú nhóm thành công!",
            });
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            Notification.error({
                text: error.response?.data?.message || "Thay đổi ghi chú nhóm thất bại!",
            });
        },
    });
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="relative cursor-pointer rounded-xl border-2 px-4 py-2">
                    <div className="flex items-center gap-1">
                        {note ? (
                            <div className="absolute -top-2 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-white">
                                <Check />
                            </div>
                        ) : null}
                        <span className="text-sm font-semibold">Ghi chú nhóm</span>
                        <NotebookPen size={20} />
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ghi chú</AlertDialogTitle>

                    <Textarea
                        placeholder="Ghi chú ...."
                        onChange={(e) => {
                            setNoteValue(e.target.value);
                        }}
                        value={noteValue}
                        className="min-h-[120px] text-base"
                    />
                    <span className="text-sm italic">
                        Ghi chú này giúp CLB đánh giá hiệu quả làm việc của nhóm. Các bạn vui lòng nhận xét công tâm để
                        CLB chọn lọc được những thành viên phù hợp nhất.
                    </span>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-black text-white"
                        onClick={() => noteUpdateMutation.mutate(noteValue)}
                    >
                        Lưu
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
