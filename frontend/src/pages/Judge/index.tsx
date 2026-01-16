import { Sparkles, Video } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import WelcomePartition from "~/components/WelcomePartition";
import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";
import Loading from "~/components/Loading";

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
            <section className="col-span-1 lg:col-span-8" id="members">
                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                        <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                            DANH SÁCH PHÒNG CHẤM
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
                                        Đề tài
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Phòng
                                    </th>
                                    <th className="hidden px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3.5">
                                        Nhóm
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
                                    rooms.map((room, index) => (
                                        <tr key={room.id} className="transition-colors hover:bg-gray-50/50">
                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                {index + 1}
                                            </td>
                                            <td className="text-primary px-4 py-3.5 text-sm font-bold sm:px-6 sm:py-4">
                                                {room.team?.topic?.title || "Chưa có đề tài"}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4">
                                                {room.roomNumber}
                                            </td>
                                            <td className="hidden px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                                {room.team ? (
                                                    <>
                                                        <span className="font-semibold">{room.team.group}</span>
                                                        {room.team.name && (
                                                            <p className="mt-0.5 text-xs text-gray-500">
                                                                {room.team.name}
                                                            </p>
                                                        )}
                                                    </>
                                                ) : (
                                                    "Chưa có nhóm"
                                                )}
                                            </td>
                                            <td className="hidden px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                                {room.startTime}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                {room.team?.schedulePresent?.googleMeetLink ? (
                                                    <a
                                                        href={room.team.schedulePresent.googleMeetLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 hover:underline"
                                                    >
                                                        <Video size={16} />
                                                        <span>Tham gia</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Chưa có link</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                {room.id ? (
                                                    <Link to={`/judge/room/${room.id}`}>
                                                        <Button
                                                            variant="outline"
                                                            className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-all hover:shadow-md"
                                                        >
                                                            <span>Xem chi tiết</span>
                                                            <Sparkles size={16} />
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Chưa có nhóm</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
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
