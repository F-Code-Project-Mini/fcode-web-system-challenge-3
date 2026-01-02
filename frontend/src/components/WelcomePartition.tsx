import { USER_ROLE } from "~/constants/enums";
import useAuth from "~/hooks/useAuth";

const WelcomePartition = () => {
    const { user } = useAuth();
    if (user.role == USER_ROLE.CANDIDATE) {
        return (
            <>
                <h1 className="flex flex-col text-3xl font-bold tracking-tight text-gray-900 sm:flex-row sm:items-center sm:text-4xl">
                    Xin chào, <span className="text-primary mt-2 sm:mt-0 sm:ml-3">{user.fullName}</span>!
                </h1>
                <span className="animate__animated animate__zoomInLeft mt-3 block text-base text-gray-600">
                    Chào mừng đến với <span className="font-semibold text-gray-900">Challenge Vòng 3</span>. Chúc bạn
                    hoàn thành tốt thử thách!
                </span>
            </>
        );
    } else if (user.role == USER_ROLE.ADMIN) {
        return (
            <>
                <h1 className="flex flex-col text-3xl font-bold tracking-tight text-gray-900 sm:flex-row sm:items-center sm:text-4xl">
                    Xin chào ADMIN, <span className="text-primary mt-2 sm:mt-0 sm:ml-3">{user.fullName}</span>!
                </h1>
                <span className="animate__animated animate__zoomInLeft mt-3 block text-base text-gray-600">
                    Chúc các bạn có một ngày thật vui vẻ!
                </span>
            </>
        );
    } else {
        return (
            <>
                <h1 className="flex flex-col text-3xl font-bold tracking-tight text-gray-900 sm:flex-row sm:items-center sm:text-4xl">
                    Xin chào, <span className="text-primary mt-2 sm:mt-0 sm:ml-3">{user.fullName}</span>!
                </h1>
                <span className="animate__animated animate__zoomInLeft mt-3 block text-base text-gray-600">
                    Chúc các bạn một ngày làm việc hiệu quả!
                </span>
            </>
        );
    }
};

export default WelcomePartition;
