import { MoveRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import Helper from "~/utils/helper";

const Timeline = () => {
    const timelineData = [
        {
            startDate: "2025-12-12T08:30:00Z",
            endDate: "2025-12-12T23:59:59Z",
            description: "Thời gian các team lên ý tưởng và chuẩn bị.",
        },
        {
            startDate: "2025-12-17T00:00:00Z",
            endDate: "2025-12-28T23:59:59Z",
            description: "Tham gia present thử để nhận xét và cải thiện ý tưởng.",
        },
        {
            startDate: "2025-12-29T00:00:00Z",
            endDate: "2025-12-31T23:59:59Z",
            description: "Đăng ký ngày tham gia present chính thức và nộp sản phẩm.",
        },
        {
            startDate: "2026-01-06T00:00:00Z",
            endDate: "2026-01-10T23:59:59Z",
            description: "Ngày present chính thức.",
        },
    ];

    return (
        <section className="col-span-1" id="timeline">
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-2xs">
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-100/60 to-white px-4 py-3 sm:px-8 sm:py-4">
                    <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Timeline</h2>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">Lịch trình thực hiện Challenge Vòng 3</p>
                </div>
                <div className="px-4 py-4 sm:px-8 sm:py-6">
                    <div className="relative mt-6 space-y-6">
                        <div className="bg-primary/20 absolute top-3 bottom-3 left-[15px] w-0.5" />

                        {timelineData.map((item, index) => (
                            <div key={index} className="relative flex gap-4">
                                <Dot
                                    number={index + 1}
                                    active={Helper.isInRangeDate(new Date(), item.startDate, item.endDate)}
                                />

                                {/* Content */}
                                <Content
                                    {...item}
                                    active={Helper.isInRangeDate(new Date(), item.startDate, item.endDate)}
                                />
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
        {/* {active && (
            <ArrowDownRight className="text-primary absolute -top-5 right-1.5 z-10 size-10 -translate-x-5 -rotate-2 font-bold" />
        )} */}
        {active && (
            <Badge
                variant="default"
                className="absolute -top-9 -left-6 mt-2 bg-yellow-500 text-white dark:bg-yellow-600"
            >
                Đang diễn ra
            </Badge>
        )}
        <div className="relative flex flex-col justify-center">
            <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm ${active ? "bg-yellow-500" : "bg-gray-200"}`}
            >
                {number}
            </div>
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
        <div
            className={`rounded-lg border border-none p-4 ${active ? "bg-primary/10" : "animate__backInRight animate__animated bg-gray-100"}`}
        >
            <div className="flex items-center gap-2">
                <BadgeTime date={startDate} active={active} />
                <MoveRight className="text-gray-400" size={15} />
                <BadgeTime date={endDate} active={active} />
            </div>
            <p className={`text-sm leading-relaxed ${active ? `font-medium text-black` : `text-gray-500`}`}>
                {description}
            </p>
        </div>
    </div>
);
export const BadgeTime = ({ date, active }: { date: string; active: boolean }) => (
    <span
        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${active ? `bg-primary/5 text-primary` : `bg-gray-200 text-gray-600`}`}
    >
        {Helper.formatDate(date)}
    </span>
);
export default Timeline;
