import WelcomePartition from "~/components/WelcomePartition";
import ListTeam from "./ListTeam";

const MentorPage = () => {
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="col-span-1 space-y-10 lg:col-span-8" id="members">
                <ListTeam />
                <ListTeam />
            </section>
        </>
    );
};

export default MentorPage;
