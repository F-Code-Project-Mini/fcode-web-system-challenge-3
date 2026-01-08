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
import suggestNameTeam from "~/data/suggestName.json";
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
    const randomSuggestions = useState(() => {
        const shuffled = [...suggestNameTeam].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8);
    })[0];

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
                        Lưu ý cần cẩn thận khi bấm xác nhận, bạn không thể đặt lại tên nhóm nữa! Hãy kiểm tra thật kỹ để
                        tránh bị trùng tên với nhóm khác!
                    </span>
                    <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Gợi ý tên nhóm:</p>
                        <div className="flex flex-wrap gap-2">
                            {randomSuggestions.map((suggestion) => (
                                <Button
                                    key={suggestion}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="text-xs transition-colors hover:bg-gray-100"
                                    onClick={() => setNewName(suggestion)}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-black text-white"
                        disabled={!newName}
                        onClick={() => changeNameTeamMutation.mutate({ idTeam: team.id, newName })}
                    >
                        Xác nhận
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
