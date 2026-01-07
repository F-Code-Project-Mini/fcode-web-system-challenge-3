const NotifyNotLeader = ({
    name,
    message = "Vui lòng chọn một thành viên làm trưởng nhóm để tiếp tục quá trình đánh giá và quản lý.",
}: {
    name: number;
    message?: string;
}) => {
    return (
        <div className="mb-2 rounded-lg border-1 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-amber-800 sm:text-base">
                        Nhóm {name} chưa có trưởng nhóm
                    </h3>
                    <p className="mt-1 text-xs text-amber-700 sm:text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default NotifyNotLeader;
