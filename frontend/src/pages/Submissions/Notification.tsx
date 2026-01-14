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
                    <p className="text-sm font-semibold text-gray-900">Nộp sản phẩm</p>

                    <ul className="mt-3 space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thời gian nộp sản phẩm mở từ <span className="font-semibold">13/01/2026</span> đến{" "}
                                <span className="font-semibold text-red-600">23h59 ngày 22/01/2026</span>.
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Các nhóm <span className="font-semibold">đăng ký Present thử</span> cần nộp sản phẩm ít
                                nhất 1 lần trước ngày <span className="font-semibold">16/01/2026</span>.
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Các nhóm <span className="font-semibold">không đăng ký Present thử</span> cần nộp sản
                                phẩm ít nhất 1 lần trước ngày <span className="font-semibold">20/01/2026</span>.
                            </span>
                        </li>

                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Số lần nộp <span className="font-semibold">không giới hạn</span>, BTC chỉ tính{" "}
                                <span className="font-semibold">lần nộp cuối cùng</span> của nhóm (Chỉ có{" "}
                                <span className="font-semibold">Leader</span> mới được phép nộp).
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
