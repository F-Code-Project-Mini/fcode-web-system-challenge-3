import WelcomePartition from "~/components/WelcomePartition";
import Team from "./Team";
import { useQuery } from "@tanstack/react-query";
import type { TeamType } from "~/types/team.types";
import TeamApi from "~/api-requests/team.requests";
import useAuth from "~/hooks/useAuth";
import Timeline from "../Candidate/Timeline";

const MentorPage = () => {
    const { user } = useAuth();
    const { data: teams } = useQuery({
        queryKey: ["mentor-teams"],
        queryFn: async () => {
            const res = await TeamApi.getTeamByMentorId(user?.id || "");
            return res;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!user?.id,
    });
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="col-span-1 space-y-10 lg:col-span-8" id="members">
                {teams && teams.result.length === 0 && (
                    <p className="text-center text-lg font-medium">
                        Hiện tại bạn chưa được phân công làm mentor cho nhóm nào.
                    </p>
                )}
                {teams?.result.map((team: TeamType) => (
                    <Team key={team.id} team={team} />
                ))}
            </section>
            <section className="mt-5 grid grid-cols-1 gap-6">
                <Timeline />
            </section>
        </>
    );
};

export default MentorPage;
