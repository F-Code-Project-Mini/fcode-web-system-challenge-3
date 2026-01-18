import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import Loading from "~/components/Loading";
import AddJudgeDialog from "./AddJudgeDialog";
import { Trash2, Clock } from "lucide-react";
import Helper from "~/utils/helper";
import type { AdminRoomType } from "~/types/admin.types";
import Notification from "~/utils/notification";

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
            Notification.success({ text: "Xóa judge khỏi phòng thành công!" });
            queryClient.invalidateQueries({ queryKey: ["admin", "rooms"] });
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            Notification.error({ text: err.response?.data?.message || "Có lỗi xảy ra!" });
        },
    });

    const handleRemoveJudge = (judgeName: string, judgeRoomId: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa giám khảo "${judgeName}" khỏi phòng chấm này không?`)) {
            removeJudgeMutation.mutate(judgeRoomId);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto py-6">
            <div className="overflow-hidden rounded-lg shadow-xs">
                {rooms?.map((room: AdminRoomType) => (
                    <div key={room.id} className="sm::px-6 t py- mb-10 border border-gray-200/70 bg-white px-5">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex-1">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-semibold text-gray-900">Phòng {room.roomNumber}</h3>
                                </div>
                                {room.team && (
                                    <h2 className="mb-2 text-base font-semibold tracking-tight text-gray-900">
                                        [NHÓM <span className="text-primary font-bold">{room.team?.group}</span>] -{" "}
                                        {room.team?.name ? (
                                            <span className="text-primary font-bold">{room.team.name}</span>
                                        ) : (
                                            <span className="text-red-500">Chưa đặt tên nhóm</span>
                                        )}
                                    </h2>
                                )}
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>
                                        {Helper.formatDateTime(room.startTime)} - {Helper.formatDateTime(room.endTime)}
                                    </span>
                                </div>
                            </div>
                            <AddJudgeDialog roomId={room.id} />
                        </div>

                        <div>
                            <h4 className="mb-2 text-sm font-medium text-gray-700">
                                Giám khảo ({room.judgeRooms.length})
                            </h4>
                            {room.judgeRooms.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-4 py-6 text-center">
                                    <p className="text-sm text-gray-500">Chưa có giám khảo nào</p>
                                </div>
                            ) : (
                                <div className="overflow-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50/50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                    STT
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                    Họ và tên
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                    Email
                                                </th>
                                                <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                    Thao tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200/60 bg-white">
                                            {room.judgeRooms.map((jr, index) => (
                                                <tr key={jr.id} className="transition-colors hover:bg-gray-50/50">
                                                    <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                        <p className="font-medium">{jr.judge.fullName}</p>
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                        {jr.judge.email}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-center sm:px-6 sm:py-4">
                                                        <button
                                                            onClick={() => handleRemoveJudge(jr.judge.fullName, jr.id)}
                                                            disabled={removeJudgeMutation.isPending}
                                                            className="inline-flex items-center justify-center rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                                                            title="Xóa giám khảo"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomsPage;
