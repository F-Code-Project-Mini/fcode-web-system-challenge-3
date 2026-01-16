import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import startTour from "~/components/AnimatedTour";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import ScrollToTop from "~/components/ScrollToTop";
import { USER_ROLE } from "~/constants/enums";
import useAuth from "~/hooks/useAuth";
import Helper from "~/utils/helper";
import LocalStorage from "~/utils/localstorage";

const MainLayout = () => {
    const { isLoading, isLogin, user, getUserInfo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
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
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, location.pathname]);

    useLayoutEffect(() => {
        if (Helper.hasRole(user.roles, USER_ROLE.CANDIDATE) && isLogin) {
            startTour();
        }
    }, [isLogin, user.roles]);

    ScrollToTop();

    return (
        <>
            <section className="flex min-h-screen flex-col justify-between bg-gradient-to-b from-gray-50/50 to-white px-4 xl:px-6">
                <section>
                    <Header />
                    <section className="mx-auto my-8 max-w-7xl sm:my-12">
                        <Outlet />
                    </section>
                </section>
                <Footer />
            </section>
        </>
    );
};

export default MainLayout;
