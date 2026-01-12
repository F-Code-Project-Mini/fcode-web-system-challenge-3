const Notification = () => {
    return (
        <div
            className="mb-6 rounded-lg border border-yellow-300/60 bg-linear-to-r from-yellow-50 to-amber-50 px-5 py-4 shadow-xs"
            role="alert"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white">
                    <span className="text-sm font-bold">!</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-red-600">Lưu ý quan trọng</p>
                    <ul className="mt-2.5 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold">Chỉ có leader</span> mới được phép đăng ký thời gian
                                thuyết trình thử
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thời gian nhận đăng ký:{" "}
                                <span className="font-semibold text-red-600">
                                    từ ngày 12/01/2026 - 23h59p 15/01/2026
                                </span>
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold">Lưu ý kiểm tra kỹ thông tin</span> trước khi đăng ký
                                present thử
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>Tất cả các liên kết đến sản phẩm đều phải được mở công khai</span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold">Không cần nộp sản phẩm</span> (Nếu đề tài không yêu cầu)
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thời gian thuyết trình thử diễn ra từ:{" "}
                                <span className="font-semibold">ngày 17/01 - 21/01</span> (Online qua Google Meet)
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
