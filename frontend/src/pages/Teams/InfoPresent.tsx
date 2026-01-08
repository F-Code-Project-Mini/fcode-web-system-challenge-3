import { BookOpen, Calendar, Clock } from "lucide-react";

const InfoPresent = () => {
    return (
        <div className="overflow-hidden rounded-lg border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white shadow-xs transition-all">
            <div className="border-b border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white px-5 py-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    Lịch thuyết trình
                </h3>
            </div>
            <div className="space-y-3 px-5 py-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                        <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">Ngày</p>
                        <p className="mt-0.5 text-xs font-semibold text-gray-900 italic">Chưa mở</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                        <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">Giờ</p>
                        <p className="mt-0.5 text-xs font-semibold text-gray-900 italic">Chưa mở</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                        <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500">Địa điểm</p>
                        <p className="mt-0.5 text-xs font-semibold text-gray-900 italic">Chưa mở</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPresent;
