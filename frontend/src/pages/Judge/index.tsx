import { Presentation, Sparkles, Video } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import WelcomePartition from "~/components/WelcomePartition";
import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";
import Loading from "~/components/Loading";
import Helper from "~/utils/helper";
import Notification from "./Notification";
import { Badge } from "~/components/ui/badge";

const JudgePage = () => {
    const { data: rooms, isLoading } = useQuery({
        queryKey: ["judge", "rooms"],
        queryFn: async () => {
            const res = await JudgeApi.getJudgeRooms();
            return res.result;
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>
            <section className="mb-6 sm:mb-8">
                <Notification />
            </section>

            <section className="col-span-1 lg:col-span-8" id="members">
                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                        <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                            DANH SÁCH CHẤM
                        </h2>
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                            Danh sách các phòng và nhóm mà bạn được phân công chấm điểm!
                        </p>
                    </div>
                    <div className="overflow-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        STT
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Nhóm
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Phòng
                                    </th>

                                    <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                        Bắt đầu
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Google Meet
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                {rooms && rooms.length > 0 ? (
                                    rooms.map((room, index) => {
                                        const { color, status, text } = Helper.formatTimeRange(
                                            room.startTime,
                                            room.endTime,
                                        );
                                        return (
                                            <tr
                                                key={room.id}
                                                className={`transition-all ${
                                                    status === "active"
                                                        ? "bg-primary/8 border-primary hover:bg-primary/15 border-l-4"
                                                        : status === "expired"
                                                          ? "bg-gray-100/80 opacity-90 hover:bg-gray-50"
                                                          : "hover:bg-gray-50/50"
                                                }`}
                                            >
                                                <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-3.5 text-sm font-medium sm:px-6 sm:py-4">
                                                    {/* {room.team?.topic?.title || "Chưa có đề tài"} */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1">
                                                            <h2 className="text-base font-medium tracking-tight text-gray-900">
                                                                [NHÓM{" "}
                                                                <span className="text-primary font-medium">
                                                                    {room.team?.group}
                                                                </span>
                                                                ] -{" "}
                                                                {room.team?.name ? (
                                                                    <span className="text-primary font-medium">
                                                                        {room.team.name}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-red-500">
                                                                        Chưa đặt tên nhóm
                                                                    </span>
                                                                )}
                                                            </h2>
                                                            <span className="text-xs italic">
                                                                Đề tài:{" "}
                                                                <span className="text-primary">
                                                                    {room.team?.topic?.title || "Chưa có đề tài"}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4">
                                                    <span className="font-semibold">{room.roomNumber}</span>
                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        Thuyết trình{" "}
                                                        {room.presentPhase === "OFFICIAL" ? "chính thức" : "thử"}
                                                    </p>
                                                </td>

                                                <td
                                                    className="hidden px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4 md:table-cell"
                                                    style={{ color }}
                                                >
                                                    <span
                                                        className="text-sm font-bold whitespace-nowrap md:table-cell"
                                                        style={{ color }}
                                                    >
                                                        {" "}
                                                        {text}
                                                    </span>
                                                    <span>{Helper.formatDateTime(room.startTime)}</span>
                                                </td>

                                                <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                    {room.team?.schedulePresent?.googleMeetLink ? (
                                                        ["urgent", "expired", "active"].includes(status) ? (
                                                            <div className="flex flex-col gap-1">
                                                                {room.team.schedulePresent.videoRecord ? (
                                                                    <Badge asChild>
                                                                        <a
                                                                            href={room.team.schedulePresent.videoRecord}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-1.5"
                                                                        >
                                                                            <Video size={14} />
                                                                            <span>Xem lại record</span>
                                                                        </a>
                                                                    </Badge>
                                                                ) : ["urgent", "active"].includes(status) ? (
                                                                    <Badge asChild className="bg-teal-600 text-white">
                                                                        <a
                                                                            href={
                                                                                room.team.schedulePresent.googleMeetLink
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-1.5"
                                                                        >
                                                                            <Presentation size={14} />
                                                                            <span>Tham gia</span>
                                                                        </a>
                                                                    </Badge>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-center text-xs text-gray-400 italic">
                                                                Chưa đến giờ
                                                            </span>
                                                        )
                                                    ) : (
                                                        <span className="text-xs text-gray-400">Chưa có link</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-fit text-xs"
                                                        asChild
                                                    >
                                                        <Link
                                                            to={`/judge/room/${room.id}`}
                                                            className="flex items-center gap-1"
                                                        >
                                                            <Sparkles size={10} /> <span>Chi tiết</span>
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500">
                                            Bạn chưa được phân công phòng chấm nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JudgePage;
