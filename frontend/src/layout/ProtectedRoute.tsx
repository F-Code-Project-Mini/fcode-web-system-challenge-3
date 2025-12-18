import { useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router";
import useAuth from "~/hooks/useAuth";

const ProtectedRoute = ({ roleAccess = [] }: { roleAccess?: string[] }) => {
    const { user } = useAuth();

    useLayoutEffect(() => {
        console.log("sau nè");

        if (!user) {
            <Navigate to="/" replace />;
        } else if (roleAccess.length > 0 && !roleAccess.includes(user.role)) {
            <Navigate to="/" replace />;
        }
    }, [user, roleAccess]);

    return <Outlet />;
};

export default ProtectedRoute;
