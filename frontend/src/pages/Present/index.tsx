import FormRegisterPresent from "./FormRegisterPresent";
import Notification from "./Notification";
import SchedulePresent from "./SchedulePresent";

const PresentPage = () => {
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Đăng ký thời gian thuyết trình</h1>
                <span className="mt-2 block text-sm text-gray-600">
                    Chọn thời gian phù hợp để tham gia buổi thuyết trình thử và thuyết trình chính thức của Challenge 3.
                </span>
            </section>

            <Notification />

            <FormRegisterPresent />
            <SchedulePresent />
        </>
    );
};

export default PresentPage;
