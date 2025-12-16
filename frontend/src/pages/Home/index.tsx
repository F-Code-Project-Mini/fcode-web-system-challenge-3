import Header from "../../components/Header";
import Mentor from "./Mentor";
import { ShowTopic } from "./ShowTopic";
import Members from "./Members";
import Timeline from "./Timeline";
import Footer from "~/components/Footer";

const HomePage = () => {
    return (
        <>
            <Header />
            <section className="mx-auto my-10 max-w-7xl">
                <section className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Xin chào, <span className="text-primary">Phạm Hoàng Tuấn</span>!
                    </h1>
                    <span className="mt-2 block text-sm text-gray-600">
                        Chào mừng đến với Challenge Vòng 3. Chúc bạn hoàn thành tốt thử thách!
                    </span>
                </section>
                <section className="">
                    <ShowTopic />
                </section>
                <section className="mt-5 grid grid-cols-12 gap-6">
                    <Timeline />
                </section>
                <section className="mt-6 grid grid-cols-12 gap-6">
                    <Members />
                    <Mentor />
                </section>
                <Footer />
            </section>
        </>
    );
};

export default HomePage;
