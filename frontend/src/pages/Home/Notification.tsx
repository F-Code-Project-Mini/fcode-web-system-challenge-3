const Notification = () => {
    return (
        <div className="mb-5 border-t border-b border-yellow-500 bg-yellow-100 px-4 py-3 text-yellow-700" role="alert">
            <p className="font-bold text-red-500">Lưu ý</p>
            <ul className="list-disc pl-4">
                <li className="text-sm">Các bạn tự làm việc với nhau và bầu chọn ra Leader.</li>
                <li className="text-sm">
                    Thêm mentor vào nhóm của các bạn để mentor theo dõi tiến độ và báo cáo cho CLB.
                </li>
                <li className="text-sm">
                    Thành viên nào trong nhóm không đăng nhập lần đầu vào hệ thống, xem như thành viên đó{" "}
                    <span className="font-bold text-red-500 italic">không tham gia</span> Challenge 3.
                </li>
                <li className="text-sm">Hãy bấm vào nút phía dưới để xem yêu cầu đề tài của nhóm các bạn.</li>
            </ul>
        </div>
    );
};

export default Notification;
