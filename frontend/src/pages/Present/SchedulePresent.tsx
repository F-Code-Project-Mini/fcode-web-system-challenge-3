import { Calendar, Clock, CheckCircle, ClipboardList, Video, Lightbulb } from "lucide-react";
import { Link } from "react-router";
import type { SchedulePresentType } from "~/types/team.types";

type Props = {
    data: SchedulePresentType;
};

const SchedulePresent = ({ data }: Props) => {
    const parseDateTime = (dateTimeStr: string) => {
        const [date, time] = dateTimeStr.split("|");
        return { date: date.trim(), time: time.trim() };
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
        <div className="overflow-hidden rounded-lg border-1 border-green-400/80 shadow-xs">
            <div className="border-b border-green-200/60 bg-gradient-to-br from-green-50/80 to-white px-5 py-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Lịch đăng ký thuyết trình
                </h3>
            </div>
            <div className="space-y-4 px-5 py-4">
                <div>
                    <div className="mb-2 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-900">Thuyết trình thử</p>
                    </div>
                    {registrationData.trialSlot ? (
                        registrationData.trialSlot.confirmed ? (
                            <div className="space-y-2">
                                <div className="rounded-md border border-blue-400 bg-blue-50 px-3 py-2.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-3.5 w-3.5 text-blue-600" />
                                            <span className="font-medium text-blue-900">
                                                {registrationData.trialSlot.date}
                                            </span>
                                            <span className="text-blue-400">•</span>
                                            <span className="text-blue-800">{registrationData.trialSlot.time}</span>
                                        </div>
                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                    </div>
                                </div>
                                <div className="rounded-md border border-blue-200 bg-blue-50/30 px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <Video className="h-3.5 w-3.5 text-blue-600" />
                                        <p className="text-xs text-blue-900">
                                            <span className="font-semibold">Link Google Meet:</span>{" "}
                                            <Link
                                                to={data.googleMeetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {data.googleMeetLink}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-md border border-blue-200 bg-blue-50/50 px-3 py-2.5">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
                                    <p className="text-sm text-blue-800">
                                        <span className="font-semibold">Đang chờ xác nhận lịch...</span>
                                    </p>
                                </div>
                                <p className="mt-1.5 text-xs text-blue-600">
                                    Bạn đã đăng ký: {registrationData.trialSlot.date} -{" "}
                                    {registrationData.trialSlot.time}
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                            <p className="text-xs text-gray-600">Không đăng ký thời gian thuyết trình thử</p>
                        </div>
                    )}
                </div>

                <div>
                    <div className="mb-2 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-green-600" />
                        <p className="text-sm font-semibold text-green-900">Thuyết trình chính thức</p>
                    </div>
                    {registrationData.officialSlot ? (
                        <>
                            {registrationData.officialSlot.confirmed && registrationData.officialSlot.confirmedSlot ? (
                                <div className="space-y-3">
                                    <div className="bg-primary/10 border-primary rounded-md border px-3 py-2.5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="h-3.5 w-3.5 text-green-600" />
                                                <span className="font-medium text-green-900">
                                                    {registrationData.officialSlot.confirmedSlot.date}
                                                </span>
                                                <span className="text-green-400">•</span>
                                                <span className="text-green-800">
                                                    {registrationData.officialSlot.confirmedSlot.time}
                                                </span>
                                            </div>
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="rounded-md border border-green-100 bg-green-50/30 px-3 py-2">
                                        <p className="text-xs text-green-800">
                                            <span className="font-semibold">✓ Đã xác nhận:</span> Đây là lịch thuyết
                                            trình chính thức đã được BTC sắp xếp.
                                        </p>
                                    </div>
                                </div>
                            ) : registrationData.officialSlot.registeredSlots &&
                              registrationData.officialSlot.registeredSlots.length > 0 ? (
                                <div className="space-y-3">
                                    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-200 border-t-amber-600"></div>
                                            <p className="text-sm text-amber-900">
                                                <span className="font-semibold">Đang chờ BTC sắp xếp lịch...</span>
                                            </p>
                                        </div>
                                        <p className="mt-1.5 text-xs text-amber-700">
                                            Ban tổ chức sẽ chọn 1 trong các khung giờ bạn đã đăng ký dưới đây.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <ClipboardList className="h-3.5 w-3.5 text-gray-500" />
                                                <p className="text-xs font-semibold text-gray-700">
                                                    Các khung giờ bạn đã chọn
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                {registrationData.officialSlot.registeredSlots.length} khung giờ
                                            </span>
                                        </div>
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-2">
                                            <div className="space-y-1.5">
                                                {registrationData.officialSlot.registeredSlots.map((slot, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 rounded border border-gray-200 bg-white px-2.5 py-1.5 text-xs"
                                                    >
                                                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                            {index + 1}
                                                        </span>
                                                        <Calendar className="h-3 w-3 text-gray-400" />
                                                        <span className="font-medium text-gray-700">{slot.date}</span>
                                                        <span className="text-gray-300">|</span>
                                                        <span className="text-gray-600">{slot.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500 italic">
                                                BTC sẽ chọn 1 trong các khung giờ trên làm lịch chính thức
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                                    <p className="text-sm text-gray-600">
                                        Chưa đăng ký thời gian thuyết trình chính thức
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                            <p className="text-sm text-gray-600">Chưa đăng ký thời gian thuyết trình chính thức</p>
                        </div>
                    )}
                </div>

                <div className="rounded-md border border-blue-100 bg-blue-50/30 px-3 py-2">
                    <p className="text-xs text-blue-800">
                        <span className="item-center flex gap-1 font-semibold">
                            <Lightbulb size={18} />
                            <span>
                                Lưu ý: Bạn chỉ được đăng ký 1 lần duy nhất. Liên hệ ban tổ chức nếu cần thay đổi.
                            </span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SchedulePresent;
