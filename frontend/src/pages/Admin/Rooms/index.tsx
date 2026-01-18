import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Loading from "~/components/Loading";
import AddJudgeDialog from "./AddJudgeDialog";
import { Trash2 } from "lucide-react";
import Helper from "~/utils/helper";
import type { AdminRoomType } from "~/types/admin.types";

const RoomsPage = () => {
    const queryClient = useQueryClient();

    const { data: rooms, isLoading } = useQuery({
        queryKey: ["admin", "rooms"],
        queryFn: async () => {
            const res = await AdminApi.getAllRooms();
            return res.result;
        },
    });

    const removeJudgeMutation = useMutation({
        mutationFn: (judgeRoomId: string) => AdminApi.removeJudgeFromRoom(judgeRoomId),
        onSuccess: () => {
            alert("Xóa judge khỏi phòng thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin", "rooms"] });
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || "Có lỗi xảy ra!");
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Quản lý Phòng Chấm</h1>
            </div>

            <div className="grid gap-4">
                {rooms?.map((room: AdminRoomType) => (
                    <Card key={room.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        Phòng {room.roomNumber}
                                        <Badge variant={room.presentPhase === "TRIAL" ? "secondary" : "default"}>
                                            {room.presentPhase === "TRIAL" ? "Thử nghiệm" : "Chính thức"}
                                        </Badge>
                                        <Badge variant={room.modePresent === "ONLINE" ? "outline" : "secondary"}>
                                            {room.modePresent === "ONLINE" ? "Online" : "Offline"}
                                        </Badge>
                                    </CardTitle>
                                    {room.team && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            {room.team.name || `Nhóm ${room.team.group}`}
                                            {room.team.topic && ` - ${room.team.topic.title}`}
                                        </p>
                                    )}
                                </div>
                                <AddJudgeDialog roomId={room.id} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="flex gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Bắt đầu:</span>{" "}
                                        <span className="font-medium">{Helper.formatDateTime(room.startTime)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Kết thúc:</span>{" "}
                                        <span className="font-medium">{Helper.formatDateTime(room.endTime)}</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-2 font-semibold">Giám khảo ({room.judgeRooms.length})</h4>
                                    {room.judgeRooms.length === 0 ? (
                                        <p className="text-sm text-gray-500">Chưa có giám khảo nào</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {room.judgeRooms.map((jr) => (
                                                <div
                                                    key={jr.id}
                                                    className="flex items-center justify-between rounded-lg border bg-gray-50 p-3"
                                                >
                                                    <div>
                                                        <p className="font-medium">{jr.judge.fullName}</p>
                                                        <p className="text-sm text-gray-500">{jr.judge.email}</p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => removeJudgeMutation.mutate(jr.id)}
                                                        disabled={removeJudgeMutation.isPending}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RoomsPage;
