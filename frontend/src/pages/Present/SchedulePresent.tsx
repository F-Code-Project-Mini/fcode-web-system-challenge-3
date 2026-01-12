import { Calendar, Clock, CheckCircle } from "lucide-react";

const SchedulePresent = () => {
    const hasRegistered = true;
    const registrationData = {
        trialSlot: { date: "17/01/2026", time: "7:00 - 7:45" },
        officialSlots: [
            { date: "17/01/2026", time: "13:00 - 13:45" },
            { date: "18/01/2026", time: "14:00 - 14:45" },
        ],
    };

    if (!hasRegistered) {
        return (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
                <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        Lịch đã đăng ký
                    </h3>
                </div>
                <div className="px-5 py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Calendar className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-900">Chưa đăng ký</p>
                    <p className="mt-1 text-xs text-gray-500">Bạn chưa đăng ký thời gian thuyết trình</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border-1 border-green-200/60 shadow-xs">
            <div className="border-b border-green-200/60 bg-gradient-to-br from-green-50/80 to-white px-5 py-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Lịch đã đăng ký
                </h3>
            </div>
            <div className="space-y-4 px-5 py-4">
                {registrationData.trialSlot && (
                    <div>
                        <div className="mb-2 flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-blue-600" />
                            <p className="text-sm font-semibold text-blue-900">Thuyết trình thử</p>
                        </div>
                        <div className="rounded-md border-1 border-blue-400 bg-blue-50 px-3 py-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-3 w-3 text-blue-600" />
                                <span className="font-medium text-blue-900">{registrationData.trialSlot.date}</span>
                                <span className="text-blue-500"> - </span>
                                <span className="text-blue-800">{registrationData.trialSlot.time}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <div className="mb-2 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-green-600" />
                        <p className="text-sm font-semibold text-green-900">Thuyết trình chính thức</p>
                    </div>
                    <div className="space-y-2">
                        {registrationData.officialSlots.map((slot, index) => (
                            <div key={index} className="bg-primary/10 border-primary rounded-md border-1 px-3 py-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-3 w-3 text-green-600" />
                                    <span className="font-medium text-green-900">{slot.date}</span>
                                    <span className="text-green-500"> - </span>
                                    <span className="text-green-800">{slot.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-md border border-amber-200/50 bg-amber-50/50 px-3 py-2">
                    <p className="text-sm text-amber-800">
                        <span className="font-semibold">Lưu ý:</span> Bạn chỉ được đăng ký 1 lần duy nhất. Liên hệ ban
                        tổ chức nếu cần thay đổi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SchedulePresent;
