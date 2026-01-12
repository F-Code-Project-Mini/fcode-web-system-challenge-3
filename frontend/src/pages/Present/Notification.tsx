import { Info } from "lucide-react";
const Notification = () => {
    return (
        <div className="mb-6 overflow-hidden rounded-md border border-amber-200 bg-amber-50">
            <div className="flex gap-3 p-4">
                <Info className="h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-amber-900">Hướng dẫn đăng ký</h3>
                    <ul className="mt-2 space-y-1 text-sm text-amber-700">
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"></span>
                            <span>
                                <strong>Thuyết trình thử (Online - 45 phút):</strong> 25 phút trình bày + 20 phút hỏi
                                đáp/góp ý.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"></span>
                            <span>
                                <strong>Thuyết trình chính thức (Offline - 60 phút):</strong> 25 phút trình bày + 35
                                phút hỏi đáp.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"></span>
                            <span>
                                <strong>Lưu ý:</strong> Thời gian và địa điểm/Google Meet sẽ được BTC cập nhật trên hệ
                                thống trước khi diễn ra buổi thuyết trình.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
