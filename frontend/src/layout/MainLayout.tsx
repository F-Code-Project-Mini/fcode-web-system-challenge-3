import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import startTour from "~/components/AnimatedTour";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { USER_ROLE } from "~/constants/enums";
import useAuth from "~/hooks/useAuth";
import LocalStorage from "~/utils/localstorage";

const MainLayout = () => {
    const { isLoading, isLogin, user, getUserInfo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("trước nè");
    useEffect(() => {
        const checkAuth = async () => {
            const isLoginLocal = LocalStorage.getItem("login");
            if (isLoginLocal && !isLoading) {
                try {
                    await getUserInfo();
                } catch {
                    LocalStorage.removeItem("login");
                    navigate("/login");
                }
            } else if (
                !isLoginLocal &&
                location.pathname !== "/login" &&
                !location.pathname.startsWith("/active/token/")
            ) {
                navigate("/login");
                console.log("vô đây");
            }
        };
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, location.pathname]);

    useLayoutEffect(() => {
        if (user.role === USER_ROLE.CANDIDATE && isLogin) {
            startTour();
        }
    }, [isLogin, user.role]);
    useLayoutEffect(() => {
        if (user.role === USER_ROLE.JUDGE && location.pathname.includes("/judge") === false) {
            console.log(location.pathname);

            navigate("/judge");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, location.pathname]);
    return (
        <>
            <section className="flex min-h-screen flex-col justify-between px-3.5 xl:px-5">
                <section>
                    <Header />
                    <section className="mx-auto my-6 max-w-7xl sm:my-10">
                        <Outlet />
                    </section>
                </section>
                <Footer />
            </section>
        </>
    );
};

export default MainLayout;
