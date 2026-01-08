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
                                Hãy <span className="font-semibold">thường xuyên theo dõi và đôn đốc</span> các ứng viên
                                trong nhóm của bạn{" "}
                                <span className="font-semibold">hoàn thành tiến độ đề tài đúng hạn</span>
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Tham gia vào các buổi họp của nhóm để quan sát và đánh giá cách làm việc của ứng viên.
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                Hướng dẫn nhóm <span className="font-semibold">bầu chọn Leader</span> - người{" "}
                                <span className="font-semibold">đại diện chính thức</span> của nhóm. CLB sẽ làm việc
                                trực tiếp với Leader
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold">Quyền hạn Leader:</span> Đặt tên nhóm, nộp đề tài, nộp
                                báo cáo tiến độ, liên hệ với Ban tổ chức khi cần hỗ trợ.
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></span>
                            <span>
                                <span className="font-semibold">Động viên tinh thần</span> các ứng viên và{" "}
                                <span className="font-semibold">đánh giá</span> một cách công tâm, khách quan để đầu vào
                                của CLB thật chất lượng.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
