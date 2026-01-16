import { Outlet, useNavigate } from "react-router";
import Loading from "~/components/Loading";
import NoAccess from "~/components/NoAccess";
import useAuth from "~/hooks/useAuth";

const ProtectedRoute = ({ roleAccess = [] }: { roleAccess?: string[] }) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return <Loading />;
    } else if (!user.roles?.some((role) => roleAccess.includes(role))) {
        navigate("/", { replace: true });
        return <NoAccess />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
