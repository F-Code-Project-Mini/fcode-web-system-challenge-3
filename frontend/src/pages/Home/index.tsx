import { USER_ROLE } from "~/constants/enums";
import MentorPage from "../Mentor";
import useAuth from "~/hooks/useAuth";
import HomePage from "../Candidate";
import JudgePage from "../Judge";
import Loading from "~/components/Loading";
import AdminPage from "../Admin";

const IndexPage = () => {
    const { user } = useAuth();

    if (user.role === USER_ROLE.CANDIDATE) {
        return <HomePage />;
    } else if (user.role === USER_ROLE.MENTOR) {
        return <MentorPage />;
    } else if (user.role === USER_ROLE.JUDGE) {
        return <JudgePage />;
    } else if (user.role === USER_ROLE.ADMIN) {
        return <AdminPage />;
    } else {
        return <Loading />;
    }
};

export default IndexPage;
