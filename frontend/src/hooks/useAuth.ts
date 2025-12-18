import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { useAppDispatch } from "./useRedux";
import { getInfoUser, logoutUser } from "~/features/userSlice";
import { useNavigate } from "react-router";
import LocalStorage from "~/utils/localstorage";
const useAuth = () => {
    const dispatch = useAppDispatch();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const isLogin = userInfo.isLogin;
    const navigate = useNavigate();

    const getUserInfo = () => {
        if (isLogin) return;
        LocalStorage.setItem("login", "true");
        dispatch(getInfoUser());
    };

    const logout = () => {
        LocalStorage.removeItem("login");
        dispatch(logoutUser());
        navigate("/login");
    };
    return {
        user: userInfo,
        getUserInfo,
        isChecking: userInfo.isChecking,
        isLogin,
        logout,
        isLoading: useSelector((state: RootState) => state.user.isLoading),
    };
};
export default useAuth;
