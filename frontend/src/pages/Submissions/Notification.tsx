const Notification = () => {
    return (
        <div className="mb-5 border-t border-b border-yellow-500 bg-yellow-100 px-4 py-3 text-yellow-700" role="alert">
            <p className="font-bold text-red-500">Lưu ý</p>
            <ul className="list-disc pl-4 [&>li]:text-sm">
                <li>Chỉ tính điểm lần nộp cuối cùng của bạn</li>
                <li>Bạn có thể nộp lại nhiều lần để cập nhật sản phẩm</li>
                <li>Đảm bảo tất cả các link đều hoạt động và có thể truy cập công khai</li>
                <li>
                    Thời gian nhận sản phẩm: <span className="font-bold text-red-600">01/12/2025 - 19/12/2025</span>
                </li>
            </ul>
        </div>
    );
};

export default Notification;
