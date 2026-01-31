import Mentor from "./Mentor";
import { ShowTopic } from "./ShowTopic";
import Members from "./Members";
import Timeline from "./Timeline";
import WelcomePartition from "~/components/WelcomePartition";
import Notification from "./Notification";
import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import useAuth from "~/hooks/useAuth";
import Notification2 from "./Notification2";
import PresentPage from "../Present";
import DisplayResultChallenge from "./DisplayResultChallenge";

const HomePage = () => {
    const { user } = useAuth();
    const { data } = useQuery({
        queryKey: ["candidate", "teams"],
        queryFn: async () => {
            const res = await TeamApi.getTeamById(user?.candidate?.teamId || "");
            return res.result;
        },
        enabled: !!user?.candidate?.teamId,
        staleTime: 5 * 60 * 1000,
    });
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="mb-2 sm:mb-4">
                <DisplayResultChallenge />
            </section>
            <section className="flex flex-col">
                <section className="border-b-2 border-gray-500/30 pb-3 max-md:order-2">
                    {/* <Notification /> */}
                    <Notification2 />
                </section>
                {/* <section className="mt-2 border-gray-500/30 pb-3 max-md:order-1 md:border-b-2">
                    <PresentPage />
                </section> */}
            </section>
            <section className="mt-8">
                <ShowTopic urlPdf={data?.topic?.filePath || ""} name={data?.topic?.title || ""} />
            </section>
            <section className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-2">
                <Members data={data} />
                <Mentor data={data?.mentorship} />
            </section>
            <section className="mt-5 grid grid-cols-1 gap-6">
                <Timeline />
            </section>
        </>
    );
};

export default HomePage;
