import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import type { UserType } from "~/types/user.types";

const useAuth = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    const login = async (user: UserType) => {
        // dispatch(await getInfoUser()); khó hiểu vl cái redux
    };
};
export default useAuth;
