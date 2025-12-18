import PartitionBanner from "./PartitionBanner";
import FormLogin from "./FormLogin";
import { useNavigate } from "react-router";
import LocalStorage from "~/utils/localstorage";
import { useEffect } from "react";
const LoginPage = () => {
    const isLoginLocal = LocalStorage.getItem("login");
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoginLocal) {
            navigate("/");
        }
    }, []);

    return (
        <section className="mx-auto grid min-h-[500px] w-full grid-cols-1 overflow-hidden rounded-lg border bg-white text-gray-700 shadow-xs sm:w-[550px] sm:grid-cols-2 lg:min-h-[700px] lg:w-[900px]">
            <PartitionBanner />
            <FormLogin />
        </section>
    );
};

export default LoginPage;
