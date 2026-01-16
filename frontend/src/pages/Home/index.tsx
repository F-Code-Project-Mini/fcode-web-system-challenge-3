import { USER_ROLE } from "~/constants/enums";
import MentorPage from "../Mentor";
import useAuth from "~/hooks/useAuth";
import HomePage from "../Candidate";
import JudgePage from "../Judge";
import Loading from "~/components/Loading";
import AdminPage from "../Admin";
import Helper from "~/utils/helper";
import LocalStorage from "~/utils/localstorage";
import type { RoleType } from "~/types/user.types";

const IndexPage = () => {
    const { user } = useAuth();
    // ưu riên role đầu tiên
    let role = LocalStorage.getItem("role") as RoleType;
    if (user.roles.includes(role) === false) {
        role = user.roles[0];
    }

    if (Helper.hasRole(role, USER_ROLE.CANDIDATE)) {
        return <HomePage />;
    } else if (Helper.hasRole(role, USER_ROLE.MENTOR)) {
        return <MentorPage />;
    } else if (Helper.hasRole(role, USER_ROLE.JUDGE)) {
        return <JudgePage />;
    } else if (Helper.hasRole(role, USER_ROLE.ADMIN)) {
        return <AdminPage />;
    } else {
        return <Loading />;
    }
};

export default IndexPage;
