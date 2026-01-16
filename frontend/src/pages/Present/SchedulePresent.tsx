import { Calendar, Clock, CheckCircle, Video, BookOpen, MapPinHouse } from "lucide-react";
import { Link } from "react-router";
import type { SchedulePresentType } from "~/types/team.types";

type Props = {
    data: SchedulePresentType;
};

const SchedulePresent = ({ data }: Props) => {
    const parseDateTime = (dateTimeStr: string) => {
        const [date, time, room] = dateTimeStr.split("|");
        return { date: date.trim(), time: time.trim(), room: room?.trim() ?? "" };
    };

    const registrationData = {
        trialSlot: data.trialDate
            ? {
                  ...parseDateTime(data.trialDate),
                  confirmed: !!data.trialDate,
              }
            : null,
        officialSlot: {
            confirmed: !!data.finalDate,
            confirmedSlot: data.finalDate ? parseDateTime(data.finalDate) : null,
            registeredSlots: data.officialDate.map((date) => parseDateTime(date)),
        },
    };

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
            {/* Thuyết trình chính thức */}
            <div className="overflow-hidden rounded-lg border border-teal-200/60 bg-gradient-to-br from-teal-50/50 to-white shadow-xs sm:col-span-4">
                <div className="border-b border-teal-200/60 bg-gradient-to-br from-teal-50/80 to-white px-4 py-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-600" />
                        Thuyết trình chính thức
                    </h3>
                </div>
                {registrationData.officialSlot.confirmed && registrationData.officialSlot.confirmedSlot ? (
                    <div className="space-y-3 bg-teal-50/50 px-4 py-3">
                        <div className="grid grid-cols-2 gap-2 border-b-1 border-gray-400 pb-2 sm:grid-cols-3">
                            <div className="flex flex-col items-center rounded-lg p-2 text-center">
                                <Calendar className="mb-1 h-3.5 w-3.5 text-teal-600" />
                                <p className="text-xs font-medium text-gray-500">Ngày</p>
                                <p className="mt-0.5 text-base font-bold text-gray-900">
                                    {registrationData.officialSlot.confirmedSlot.date}
                                </p>
                            </div>
                            <div className="flex flex-col items-center rounded-lg p-2 text-center">
                                <Clock className="mb-1 h-3.5 w-3.5 text-teal-600" />
                                <p className="text-xs font-medium text-gray-500">Giờ</p>
                                <p className="mt-0.5 text-base font-bold text-gray-900">
                                    {registrationData.officialSlot.confirmedSlot.time}
                                </p>
                            </div>
                            <div className="flex flex-col items-center rounded-lg p-2 text-center max-sm:col-span-2">
                                <MapPinHouse className="mb-1 h-3.5 w-3.5 text-teal-600" />
                                <p className="text-xs font-medium text-gray-500">Địa điểm</p>
                                <p className="mt-0.5 text-base font-bold text-gray-900">
                                    P{registrationData.officialSlot.confirmedSlot.room}, ĐH FPT HCM
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center overflow-visible rounded-lg p-2 text-center">
                            <CheckCircle className="relative z-10 mb-1 h-3.5 w-3.5 text-teal-600" />
                            <p className="relative z-10 text-xs font-medium text-gray-500">Phê duyệt bởi</p>
                            <p className="relative z-10 mt-0.5 flex flex-col text-xs text-teal-700">
                                <span className="text-lg font-bold text-emerald-700 italic">Phạm Hoàng Tuấn</span>
                                <span className="font-semibold text-teal-700">Tech Lead Recruitment</span>
                                <span className="font-semibold text-teal-700">Lead Challenge 3</span>
                            </p>
                            <img
                                src="/fcode.png"
                                alt="fcode"
                                className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-10 w-12 -translate-x-1/2 -translate-y-1/2 opacity-50 blur-[1px] select-none"
                            />
                            <div className="pointer-events-none absolute inset-0"></div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border border-teal-200/50 bg-teal-50/30 p-2.5 text-center">
                            <p className="relative z-10 text-xs font-medium text-teal-800 italic">
                                Nhóm được xác nhận đủ điều kiện để bước vào vòng Thuyết trình chính thức.
                            </p>
                        </div>
                    </div>
                ) : registrationData.officialSlot.registeredSlots &&
                  registrationData.officialSlot.registeredSlots.length > 0 ? (
                    <div className="space-y-3 px-4 py-3">
                        <div className="rounded-lg border border-amber-200/50 bg-amber-50/30 p-2.5">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-200 border-t-amber-600"></div>
                                <p className="text-xs font-bold text-amber-800">Đang chờ BTC sắp xếp lịch</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-gray-700">Các khung giờ đã đăng ký</p>
                                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                                    {registrationData.officialSlot.registeredSlots.length} khung giờ
                                </span>
                            </div>
                            <div className="space-y-1.5">
                                {registrationData.officialSlot.registeredSlots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 rounded-lg border border-gray-200/50 bg-gray-50/50 px-3 py-2"
                                    >
                                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                                            {index + 1}
                                        </span>
                                        <Calendar className="h-3 w-3 text-gray-500" />
                                        <span className="text-xs font-semibold text-gray-800">{slot.date}</span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <Clock className="h-3 w-3 text-gray-500" />
                                        <span className="text-xs text-gray-700">{slot.time}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-lg bg-blue-50/50 px-2.5 py-2 text-center">
                                <p className="text-xs font-bold text-teal-700">BTC sẽ chọn 1 khung giờ phù hợp nhất</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-3">
                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3 text-center">
                            <p className="text-xs font-medium text-gray-500">Chưa đăng ký</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Thuyết trình thử */}
            <div className="h-fit overflow-hidden rounded-lg border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white shadow-xs sm:col-span-2">
                <div className="border-b border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white px-4 py-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <Clock className="h-3.5 w-3.5 text-amber-600" />
                        Thuyết trình thử
                    </h3>
                </div>
                {registrationData.trialSlot ? (
                    <div className="space-y-3 px-4 py-3">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col items-center rounded-lg bg-amber-50/50 p-2 text-center">
                                <Calendar className="mb-1 h-3.5 w-3.5 text-amber-600" />
                                <p className="text-xs font-medium text-gray-500">Ngày</p>
                                <p className="mt-0.5 text-xs font-bold text-gray-900">
                                    {registrationData.trialSlot.date}
                                </p>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-amber-50/50 p-2 text-center">
                                <Clock className="mb-1 h-3.5 w-3.5 text-amber-600" />
                                <p className="text-xs font-medium text-gray-500">Giờ</p>
                                <p className="mt-0.5 text-xs font-bold text-gray-900">
                                    {registrationData.trialSlot.time}
                                </p>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-amber-50/50 p-2 text-center">
                                <BookOpen className="mb-1 h-3.5 w-3.5 text-amber-600" />
                                <p className="text-xs font-medium text-gray-500">Nơi</p>
                                <p className="mt-0.5 text-xs font-bold text-gray-900">Google Meet</p>
                            </div>
                        </div>
                        {data.googleMeetLink && (
                            <div className="rounded-lg border border-amber-200/50 bg-amber-50/30 p-2.5">
                                <div className="flex items-center gap-2">
                                    <Video className="h-3.5 w-3.5 flex-shrink-0 text-amber-600" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium text-gray-700">Link Google Meet</p>
                                        <Link
                                            to={data.googleMeetLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold break-all text-blue-400 hover:text-blue-600 hover:underline"
                                        >
                                            {data.googleMeetLink}
                                        </Link>
                                        <img
                                            src="/icon-new.gif"
                                            alt="important"
                                            className="ml-1 inline-block h-4 w-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="px-4 py-3">
                        <p className="text-center text-xs font-medium text-gray-500">Không đăng ký</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchedulePresent;
