import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import { useState } from "react";
import TeamApi from "~/api-requests/team.requests";
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
import type { TeamType } from "~/types/team.types";
import Notification from "~/utils/notification";

export function ChoiceLeader({ team }: { team: TeamType }) {
    const queryClient = useQueryClient();
    const [leaderId, setLeaderId] = useState(() => team?.leader?.id || "");
    const changeLeaderMutation = useMutation({
        mutationFn: (data: { idTeam: string; idLeader: string }) => TeamApi.setLeader(data.idTeam, data.idLeader),
        onError: () => {
            Notification.error({
                text: "Thay đổi leader thất bại!",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mentor-teams"] });
            Notification.success({
                text: "Thay đổi leader thành công!",
            });
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="shadow-base flex w-fit cursor-pointer items-center gap-2 rounded-xl border p-2"
                >
                    <UserRound size={18} />
                    <span>Thay đổi Leader</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cập nhật leader cho nhóm</AlertDialogTitle>
                    <Select value={leaderId} onValueChange={setLeaderId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a leader" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Leader</SelectLabel>
                                {team.candidates.map((candidate) => (
                                    <SelectItem key={candidate.id} value={candidate.id}>
                                        [{candidate.studentCode}] - {candidate.user.fullName}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-black text-white"
                        onClick={() => changeLeaderMutation.mutate({ idTeam: team.id, idLeader: leaderId })}
                    >
                        Xác nhận
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
