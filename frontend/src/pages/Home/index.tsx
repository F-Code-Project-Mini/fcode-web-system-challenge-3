import Mentor from "./Mentor";
import { ShowTopic } from "./ShowTopic";
import Members from "./Members";
import Timeline from "./Timeline";
import useAuth from "~/hooks/useAuth";

const HomePage = () => {
    const { user } = useAuth();
    console.log(user);

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <h1 className="flex flex-col text-2xl font-bold text-gray-900 sm:flex-row sm:items-center sm:text-3xl">
                    Xin chào, <span className="text-primary mt-1 sm:mt-0 sm:ml-2">{user.fullName}</span>!
                </h1>
                <span className="animate__animated animate__zoomInLeft mt-2 block text-sm text-gray-600">
                    Chào mừng đến với <span className="font-bold">Challenge Vòng 3</span>. Chúc bạn hoàn thành tốt thử
                    thách!
                </span>
            </section>
            <section>
                <ShowTopic />
            </section>
            <section className="mt-5 grid grid-cols-1 gap-6">
                <Timeline />
            </section>
            <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                <Members />
                <Mentor />
            </section>
        </>
    );
};

export default HomePage;
