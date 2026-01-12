const Notification = () => {
    return (
        <div
            className="mb-6 rounded-lg border border-yellow-300/60 bg-linear-to-r from-yellow-50 to-amber-50 px-5 py-4 shadow-xs"
            role="alert"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white">
                    <span className="text-sm font-bold">!</span>
                </div>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Thông báo thuyết trình thử – CLB F-Code</p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        Chúc mừng các bạn đã hoàn thành 2/3 chặng đường trong quá trình tuyển thành viên CLB F-Code.
                        Nhằm tạo điều kiện để các nhóm chuẩn bị tốt hơn cho buổi thuyết trình chính thức, CLB tổ chức
                        buổi thuyết trình thử để các nhóm làm quen với hình thức trình bày và nhận phản hồi cải thiện
                        nội dung.
                    </p>

                    <ul className="mt-3 space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Chỉ <span className="font-semibold">leader nhóm</span> được đăng ký thời gian thuyết
                                trình thử
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thời gian đăng ký:{" "}
                                <span className="font-semibold text-red-600">
                                    từ ngày 12/01/2026 đến 23h59 ngày 15/01/2026
                                </span>
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>Các liên kết đến slide hoặc sản phẩm cần được để ở chế độ công khai</span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>Không yêu cầu nộp sản phẩm nếu đề tài không có yêu cầu</span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thời gian thuyết trình thử dự kiến từ{" "}
                                <span className="font-semibold">ngày 17/01 đến 21/01</span> (Online qua Google Meet)
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
