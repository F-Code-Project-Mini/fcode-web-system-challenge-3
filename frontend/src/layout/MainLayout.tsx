import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const MainLayout = () => {
    return (
        <>
            <section className="flex min-h-screen flex-col justify-between px-5">
                <section>
                    <Header />
                    <section className="mx-auto my-10 max-w-7xl">
                        <Outlet />
                    </section>
                </section>
                <Footer />
            </section>
        </>
    );
};

export default MainLayout;
