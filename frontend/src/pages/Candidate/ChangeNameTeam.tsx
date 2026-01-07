import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";

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
import { Input } from "~/components/ui/input";
import { useState } from "react";
import TeamApi from "~/api-requests/team.requests";
import Notification from "~/utils/notification";
import type { TeamType } from "~/types/team.types";
import type { AxiosError } from "axios";

export function ChangeNameTeam({ team }: { team: TeamType }) {
    const queryClient = useQueryClient();
    const [newName, setNewName] = useState(team.name!);
    const changeNameTeamMutation = useMutation({
        mutationFn: (data: { idTeam: string; newName: string }) => TeamApi.changeNameTeam(data.idTeam, data.newName),
        onError: (error: AxiosError<{ message?: string }>) => {
            console.log(error);

            Notification.error({
                text: error.response?.data?.message || "Thay đổi tên nhóm thất bại!",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidate", "teams"] });
            Notification.success({
                text: "Thay đổi tên nhóm thành công!",
            });
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-4 shrink-0">
                    <Pen size={15} />
                    Đặt tên nhóm
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Đặt tên nhóm</AlertDialogTitle>
                    <Input
                        placeholder="Nhập tên nhóm mới"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <span className="text-sm text-red-500 italic">
                        Lưu ý cần cẩn thận khi bấm xác nhận, bạn không thể đặt lại tên nhóm nữa!
                    </span>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-black text-white"
                        onClick={() => changeNameTeamMutation.mutate({ idTeam: team.id, newName })}
                    >
                        Xác nhận
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
