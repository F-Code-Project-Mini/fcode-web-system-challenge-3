import { Commet } from "react-loading-indicators";
const Loading = () => {
    return (
        <section className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-xs">
            <div className="flex flex-col items-center gap-4 rounded-lg p-6">
                <Commet color="#32cd32" size="medium" text="" textColor="" />
                <span className="font-bold text-white">Đang xử lý...</span>
            </div>
        </section>
    );
};

export default Loading;
