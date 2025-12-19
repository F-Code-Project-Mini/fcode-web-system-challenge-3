import PartitionBanner from "../Login/PartitionBanner";
import FormSetPassword from "./FormSetPassword";

const ActivePage = () => {
    return (
        <section className="mx-auto grid min-h-[500px] w-full grid-cols-1 overflow-hidden rounded-lg border bg-white text-gray-700 shadow-xs sm:w-[550px] sm:grid-cols-2 lg:min-h-[700px] lg:w-[900px]">
            <PartitionBanner />
            <FormSetPassword />
        </section>
    );
};

export default ActivePage;
