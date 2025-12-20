import WelcomePartition from "~/components/WelcomePartition";
import Teams from "./Team";

const AdminPage = () => {
    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                <Teams />
                <Teams />
                <Teams />
                <Teams />
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
