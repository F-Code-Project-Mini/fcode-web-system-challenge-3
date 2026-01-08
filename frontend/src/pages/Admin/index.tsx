import { useQuery } from "@tanstack/react-query";
import Teams from "./Team";
import TeamApi from "~/api-requests/team.requests";

const AdminPage = () => {
    const { data: teams } = useQuery({
        queryKey: ["admin", "teams"],
        queryFn: async () => {
            const res = await TeamApi.getAllTeams();
            return res.result;
        },
        staleTime: 5 * 60 * 1000,
    });
    return (
        <>
            <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                {teams?.map((item) => (
                    <Teams key={item.id} team={item} />
                ))}
            </section>
            <section>
                {/* <Notification /> */}
                {/* <ShowTopic /> */}
            </section>
            {/* <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                <Members />
                <Mentor />
            </section>
            <section className="mt-5 grid grid-cols-1 gap-6">
                <Timeline /> 
            </section> */}
        </>
    );
};

export default AdminPage;
