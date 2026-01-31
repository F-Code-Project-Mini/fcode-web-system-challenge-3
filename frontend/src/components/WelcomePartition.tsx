import { USER_ROLE, type UserRole } from "~/constants/enums";
import useAuth from "~/hooks/useAuth";
import Helper from "~/utils/helper";
import LocalStorage from "~/utils/localstorage";

const WelcomePartition = () => {
    const { user } = useAuth();
    const role = LocalStorage.getItem("role") as UserRole;
    console.log(role);

    if (!user.roles.includes(role) || !role) return;
    const greeting = Helper.hasRole(role, USER_ROLE.JUDGE) ? "Xin chào Giám khảo" : "Xin chào";
    const message = Helper.hasRole(role, USER_ROLE.CANDIDATE)
        ? "Chào mừng đến với Challenge Vòng 3. Chúc bạn hoàn thành tốt thử thách!"
        : Helper.hasRole(role, USER_ROLE.JUDGE)
          ? "Chúc bạn có một ngày thật vui vẻ!"
          : "Chúc bạn một ngày làm việc hiệu quả!";

    return (
        <>
            <h1 className="flex flex-col text-3xl font-bold tracking-tight text-gray-900 sm:flex-row sm:items-center sm:text-4xl">
                {greeting}, <span className="text-primary mt-2 sm:mt-0 sm:ml-3">{user.fullName}</span>!
            </h1>
            <span className="animate__animated animate__zoomInLeft mt-3 block text-base text-gray-600">{message}</span>
        </>
    );
};

export default WelcomePartition;
