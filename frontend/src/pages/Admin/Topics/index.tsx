import Teams from "../Team";

const TopicsPage = () => {
    return (
        <>
            <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                <Teams />
                <Teams />
                <Teams />
                <Teams />
            </section>
        </>
    );
};

export default TopicsPage;
