const Notification = () => {
    return (
        <div
            className="mb-6 rounded-lg border border-yellow-300/60 bg-gradient-to-r from-yellow-50 to-amber-50 px-5 py-4 shadow-xs"
            role="alert"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white">
                    <span className="text-sm font-bold">!</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-red-600">Lưu ý quan trọng</p>
                    <ul className="mt-2.5 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Chỉ tính sản phẩm ở lần nộp cuối, bạn có thể nộp lại nhiều lần để cập nhật sản phẩm
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>Đảm bảo tất cả các link đều hoạt động và có thể truy cập công khai</span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thời gian nhận sản phẩm:{" "}
                                <span className="font-semibold text-red-600">đến hết ngày 21/01/2026</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
