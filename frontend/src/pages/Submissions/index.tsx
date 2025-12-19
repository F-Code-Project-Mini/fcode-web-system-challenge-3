import FormSubmit from "./FormSubmit";
import HistorySubmit from "./HistorySubmit";
import Notification from "./Notification";

const SubmissionsPage = () => {
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Nộp đề tài</h1>
                <span className="mt-2 block text-sm text-gray-600">
                    Gửi sản phẩm và mã nguồn của bạn để được tham gia buổi thuyết trình chính thức ở vòng Challenge 3.
                </span>
            </section>

            <Notification />

            <FormSubmit />

            <HistorySubmit />
        </>
    );
};

export default SubmissionsPage;
