import Teams from "../Team";

const TeamsPage = () => {
    return (
        <>
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

export default TeamsPage;
