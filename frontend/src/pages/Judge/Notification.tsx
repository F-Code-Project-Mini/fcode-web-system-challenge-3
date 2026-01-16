import { Megaphone } from "lucide-react";

const Notification = () => {
    return (
        <div
            className="mb-2 rounded-lg border border-blue-300/60 bg-linear-to-r from-blue-50 to-cyan-50 px-5 py-4 shadow-xs"
            role="alert"
        >
            <div className="flex items-center gap-3">
                {/* <div className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white md:flex">
                    <span className="text-sm font-bold">!</span>
                </div> */}
                <div className="flex-1">
                    <p className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                        <Megaphone />
                        Thông báo
                    </p>
                    <ul className="mt-2.5 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                            <span>Link google sẽ được mở trước thời điểm bắt đầu 1 tiếng đồng hồ.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
