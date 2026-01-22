import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { useAppDispatch } from "./useRedux";
import { getInfo, logoutUser } from "~/features/userSlice";
import { useNavigate } from "react-router";
import LocalStorage from "~/utils/localstorage";
const useAuth = () => {
    const dispatch = useAppDispatch();
    const { userInfo, isLoading } = useSelector((state: RootState) => state.user);
    const isLogin = userInfo.isLogin;
    const navigate = useNavigate();

    const getUserInfo = () => {
        if (isLogin) return;
        LocalStorage.setItem("login", "true");
        dispatch(getInfo());
    };

    const logout = () => {
        LocalStorage.removeItem("login");
        LocalStorage.removeItem("access_token");
        LocalStorage.removeItem("role");

        dispatch(logoutUser());
        navigate("/login");
    };
    return {
        user: userInfo,
        getUserInfo,
        isChecking: userInfo.isChecking,
        isLogin,
        logout,
        isLoading,
    };
};
export default useAuth;
