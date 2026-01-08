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
                    <p className="text-sm font-semibold text-red-600">Lưu ý quan trọng dành cho Mentor</p>
                    <ul className="mt-2.5 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold text-red-600">Chấm điểm theo barem:</span> Vui lòng{" "}
                                <span className="font-semibold">đọc kỹ và tuân thủ đúng tiêu chí barem</span> đã được
                                quy định cho từng hạng mục đánh giá.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold text-red-600">Điền đầy đủ điểm số:</span> Bạn cần{" "}
                                <span className="font-semibold">điền hết tất cả các cột điểm</span> cho từng tiêu chí
                                đánh giá, không được bỏ trống.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold text-red-600">Ghi chú chi tiết:</span> Hãy{" "}
                                <span className="font-semibold">ghi chú rõ ràng, cụ thể</span> về điểm mạnh, điểm yếu và
                                lý do chấm điểm.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold text-red-600">Thời hạn:</span> Hoàn thành việc chấm điểm
                                và điền đầy đủ thông tin <span className="font-semibold">trước ngày 24/01/2026</span>.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold">Ban tổ chức sẽ duyệt và đọc lại</span> toàn bộ đánh giá
                                khi kết thúc Challenge để đảm bảo tính công bằng.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
