import WelcomePartition from "~/components/WelcomePartition";
import Team from "./Team";
import { useQuery } from "@tanstack/react-query";
import type { TeamType } from "~/types/team.types";
import TeamApi from "~/api-requests/team.requests";

const MentorPage = () => {
    const { data: teams } = useQuery({
        queryKey: ["mentor-teams"],
        queryFn: async () => {
            const res = await TeamApi.getTeamByMentorId("a9b925b5-e2c1-4625-8b4d-7585355299b0");
            return res;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="col-span-1 space-y-10 lg:col-span-8" id="members">
                {teams?.result.map((team: TeamType) => (
                    <Team key={team.id} team={team} />
                ))}
            </section>
        </>
    );
};

export default MentorPage;
