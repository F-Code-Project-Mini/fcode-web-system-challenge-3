import Mentor from "./Mentor";
import { ShowTopic } from "./ShowTopic";
import Members from "./Members";
import Timeline from "./Timeline";
import WelcomePartition from "~/components/WelcomePartition";
import Notification from "./Notification";

const HomePage = () => {
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section>
                <Notification />
                <ShowTopic />
            </section>
            <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                <Members />
                <Mentor />
            </section>
            <section className="mt-5 grid grid-cols-1 gap-6">
                <Timeline />
            </section>
        </>
    );
};

export default HomePage;
