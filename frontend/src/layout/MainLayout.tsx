import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import startTour from "~/components/AnimatedTour";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import useAuth from "~/hooks/useAuth";
import LocalStorage from "~/utils/localstorage";

const MainLayout = () => {
    const { isLoading, getUserInfo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const checkAuth = async () => {
            const isLoginLocal = LocalStorage.getItem("login");
            if (isLoginLocal && !isLoading) {
                try {
                    await getUserInfo();
                    startTour();
                } catch {
                    LocalStorage.removeItem("login");
                    navigate("/login");
                }
            } else if (!isLoginLocal && location.pathname !== "/login") {
                navigate("/login");
            }
        };
        checkAuth();
    }, [isLoading, location.pathname]);
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
