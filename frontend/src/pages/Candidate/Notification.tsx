import { OctagonAlert } from "lucide-react";

const Notification = () => {
    return (
        <div
            className="mb-6 rounded-lg border border-yellow-300/60 bg-gradient-to-r from-yellow-50 to-amber-50 px-5 py-4 shadow-xs"
            role="alert"
        >
            <div className="flex items-center gap-3">
                {/* <div className="hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white md:flex">
                    <span className="text-sm font-bold">!</span>
                </div> */}
                <div className="flex-1">
                    <p className="flex items-center gap-1 text-sm font-semibold text-red-600">
                        <OctagonAlert />
                        Lưu ý quan trọng
                    </p>
                    <ul className="mt-2.5 space-y-2">
                        {/* <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>Các thí sinh chủ động liên hệ với thành viên trong nhóm và mentor.</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Các bạn tự làm việc với nhau và bầu chọn ra Leader, sau đó báo cáo lại với Mentor.
                            </span>
                        </li> */}

                        {/* <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Thành viên nào trong nhóm không đăng nhập lần đầu vào hệ thống, xem như thành viên đó{" "}
                                <span className="font-semibold text-red-600">không tham gia</span> Challenge 3.
                            </span>
                        </li> */}
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>Mentor chỉ tham gia giám sát tiến độ và không hỗ trợ kiến thức học thuật.</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span className="">Tất cả thành viên bắt buộc đều phải thuyết trình.</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Các <span className="font-bold">nhóm đăng ký Present thử</span> cần nộp sản phẩm
                                <span className="font-semibold text-red-600"> ít nhất 1 lần</span> trước ngày{" "}
                                <span className="font-semibold">16/01/2026</span>.
                            </span>
                            <img src="/icon-new.gif" alt="important" className="inline h-6 w-10" />
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Các nhóm không đăng ký Present thử cần nộp sản phẩm
                                <span className="font-semibold text-red-600"> ít nhất 1 lần</span> trước ngày{" "}
                                <span className="font-semibold">20/01/2026</span>.
                            </span>
                            <img src="/icon-new.gif" alt="important" className="inline h-6 w-10" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
