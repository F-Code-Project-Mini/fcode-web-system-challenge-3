import Mentor from "./Mentor";
import { ShowTopic } from "./ShowTopic";
import Members from "./Members";
import Timeline from "./Timeline";
import WelcomePartition from "~/components/WelcomePartition";
import Notification from "./Notification";
import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import useAuth from "~/hooks/useAuth";

const HomePage = () => {
    const { user } = useAuth();
    const { data } = useQuery({
        queryKey: ["candidate", "teams"],
        queryFn: async () => {
            const res = await TeamApi.getTeamById(user?.candidate?.teamId || "");
            return res.result;
        },
    });
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section>
                <Notification />
                <ShowTopic urlPdf={data?.topic.filePath || ""} />
            </section>
            <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                <Members data={data} />
                <Mentor data={data?.mentorship?.mentor} />
            </section>
            <section className="mt-5 grid grid-cols-1 gap-6">
                <Timeline />
            </section>
        </>
    );
};

export default HomePage;
