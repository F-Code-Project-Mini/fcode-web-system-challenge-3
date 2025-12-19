import { Outlet, useNavigate } from "react-router";
import Loading from "~/components/Loading";
import NoAccess from "~/components/NoAccess";
import useAuth from "~/hooks/useAuth";

const ProtectedRoute = ({ roleAccess = [] }: { roleAccess?: string[] }) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    console.log("isLoading, ", isLoading);

    if (isLoading) {
        return <Loading />;
    } else if (roleAccess.includes(user.role) === false) {
        navigate("/", { replace: true });
        return <NoAccess />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
