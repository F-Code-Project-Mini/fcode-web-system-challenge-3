const Notification = () => {
    return (
        <div
            className="mb-6 rounded-lg border border-blue-300/60 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 shadow-xs"
            role="alert"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <span className="text-sm font-bold">i</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-700">Ghi chú</p>
                    <ul className="mt-2.5 space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                            <span>
                                Các bạn sẽ có cơ hội <strong>tìm hiểu khả năng của nhau</strong> thông qua quá trình làm
                                việc nhóm.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                            <span>
                                Đề tài sẽ được phân công dựa trên <strong>năng lực và thế mạnh</strong> của từng thành
                                viên.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                            <span>
                                Mỗi nhóm sẽ có <strong>1-2 người có kinh nghiệm</strong> để định hướng và hỗ trợ các
                                thành viên khác.
                            </span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                            <span>
                                Đây là cơ hội để <strong>học hỏi công nghệ mới</strong> và phát triển kỹ năng làm việc
                                nhóm.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
