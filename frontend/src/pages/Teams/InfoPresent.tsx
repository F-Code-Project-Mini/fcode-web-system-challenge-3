import { BookOpen, Calendar, Clock, CheckCircle } from "lucide-react";
import type { SchedulePresent } from "~/types/team.types";
const SchedulePresent = (trial: string, index: number) => {
    return trial.split("|")[index] || "";
};
const InfoPresent = ({ schedule }: { schedule: SchedulePresent }) => {
    return (
        <div className="space-y-3">
            {schedule.trialDate && (
                <div className="overflow-hidden rounded-lg border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white shadow-xs transition-all">
                    <div className="border-b border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white px-4 py-3">
                        <h3 className="flex items-center gap-2 text-xs font-semibold text-gray-900">
                            <Clock className="h-3.5 w-3.5 text-amber-600" />
                            Thuyết trình thử
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 px-4 py-3">
                        <div className="flex flex-col items-center rounded-lg bg-amber-50/50 p-2 text-center">
                            <Calendar className="mb-1 h-3.5 w-3.5 text-amber-600" />
                            <p className="text-xs font-medium text-gray-500">Ngày</p>
                            <p className="mt-0.5 text-xs font-bold text-gray-900">
                                {SchedulePresent(schedule.trialDate, 0)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-amber-50/50 p-2 text-center">
                            <Clock className="mb-1 h-3.5 w-3.5 text-amber-600" />
                            <p className="text-xs font-medium text-gray-500">Giờ</p>
                            <p className="mt-0.5 text-xs font-bold text-gray-900">
                                {SchedulePresent(schedule.trialDate, 1)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-amber-50/50 p-2 text-center">
                            <BookOpen className="mb-1 h-3.5 w-3.5 text-amber-600" />
                            <p className="text-xs font-medium text-gray-500">Nơi</p>
                            <p className="mt-0.5 text-xs font-bold text-gray-900">Google Meet</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Thuyết trình chính thức */}
            <div className="overflow-hidden rounded-lg border border-teal-200/60 bg-gradient-to-br from-teal-50/50 to-white shadow-xs transition-all">
                <div className="border-b border-teal-200/60 bg-gradient-to-br from-teal-50/80 to-white px-4 py-3">
                    <h3 className="flex items-center gap-2 text-xs font-semibold text-gray-900">
                        <CheckCircle className="h-3.5 w-3.5 text-teal-600" />
                        Thuyết trình chính thức
                    </h3>
                </div>
                {schedule.finalDate ? (
                    <div className="grid grid-cols-3 gap-2 bg-teal-50/50 px-4 py-3">
                        <div className="flex flex-col items-center rounded-lg p-2 text-center">
                            <Calendar className="mb-1 h-3.5 w-3.5 text-teal-600" />
                            <p className="text-xs font-medium text-gray-500">Ngày</p>
                            <p className="mt-0.5 text-xs font-bold text-gray-900">
                                {SchedulePresent(schedule.finalDate, 0)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg p-2 text-center">
                            <Clock className="mb-1 h-3.5 w-3.5 text-teal-600" />
                            <p className="text-xs font-medium text-gray-500">Giờ</p>
                            <p className="mt-0.5 text-xs font-bold text-gray-900">
                                {SchedulePresent(schedule.finalDate, 1)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg p-2 text-center">
                            <CheckCircle className="mb-1 h-3.5 w-3.5 text-teal-600" />
                            <p className="text-xs font-medium text-gray-500">Nơi</p>
                            <p className="mt-0.5 text-xs font-bold text-gray-900">
                                P{SchedulePresent(schedule.finalDate, 2)}, ĐH FPT HCM
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-3">
                        <div className="rounded-lg text-center">
                            <p className="text-xs font-medium text-amber-700">Đang chờ BTC sắp xếp lịch</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoPresent;
