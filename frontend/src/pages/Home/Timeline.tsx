import { ArrowDownRight, Calendar, CornerUpRight } from "lucide-react";

const Timeline = () => {
    const timelineData = [
        {
            startDate: "16/12/2024",
            endDate: "25/12/2024",
            description: "Thời gian các team lên ý tưởng và chuẩn bị.",
        },
        {
            startDate: "25/12/2024",
            endDate: "28/12/2024",
            description: "Tham gia present thử để nhận xét và cải thiện ý tưởng.",
        },
        {
            startDate: "29/12/2024",
            endDate: "31/12/2024",
            description: "Đăng ký ngày tham gia present chính thức và nộp sản phẩm.",
        },
        {
            startDate: "6/1/2025",
            endDate: "10/1/2025",
            description: "Ngày present chính thức.",
        },
    ];

    return (
        <section className="col-span-12">
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs">
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-100 to-white px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
                    <p className="mt-1 text-sm text-gray-500">Lịch trình thực hiện Challenge Vòng 3</p>
                </div>
                <div className="px-6 py-6">
                    <div className="relative space-y-6">
                        {/* Vertical line */}
                        <div className="bg-primary/20 absolute top-3 bottom-3 left-[15px] w-0.5" />

                        {timelineData.map((item, index) => (
                            <div key={index} className="relative flex gap-4">
                                <Dot number={index + 1} active={index === 0} />

                                {/* Content */}
                                <Content {...item} active={index === 0} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
const Dot = ({ number, active = false }: { number: number; active?: boolean }) => (
    <div className="relative flex-shrink-0">
        {active && <ArrowDownRight className="text-primary size-10 -translate-x-5 rotate-10 font-bold" />}
        <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm ${active ? "bg-primary" : "bg-gray-200"}`}
        >
            {number}
        </div>
    </div>
);
const Content = ({
    startDate,
    endDate,
    description,
    active = false,
}: {
    startDate: string;
    endDate: string;
    description: string;
    active?: boolean;
}) => (
    <div className="flex-1 pb-2">
        <div className={`bg-primary/5 rounded-lg border border-none p-4 ${active ? "" : "opacity-50"}`}>
            <div className="mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-1 text-xs font-semibold">
                    {startDate}
                </span>
                <span className="text-gray-400">→</span>
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-1 text-xs font-semibold">
                    {endDate}
                </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">{description}</p>
        </div>
    </div>
);
export default Timeline;
