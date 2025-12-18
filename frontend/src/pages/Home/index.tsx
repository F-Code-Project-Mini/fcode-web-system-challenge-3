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
            <section className="mb-8">
                <h1 className="flex items-center text-3xl font-bold text-gray-900">
                    Xin chào, <span className="text-primary">{user.fullName}</span>!
                </h1>
                <span className="animate__animated animate__zoomInLeft mt-2 block text-sm text-gray-600">
                    Chào mừng đến với <span className="font-bold">Challenge Vòng 3</span>. Chúc bạn hoàn thành tốt thử
                    thách!
                </span>
            </section>
            <section className="">
                <ShowTopic />
            </section>
            <section className="mt-5 grid grid-cols-12 gap-6">
                <Timeline />
            </section>
            <section className="mt-6 grid grid-cols-12 gap-2">
                <Members />
                <Mentor />
            </section>
        </>
    );
};

export default HomePage;
