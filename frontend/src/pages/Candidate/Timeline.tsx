import { MoveRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import Helper from "~/utils/helper";

const Timeline = () => {
    const timelineData = [
        {
            startDate: "2026-01-05T00:00:00Z",
            endDate: "2026-01-05T23:59:59Z",
            description: "Thông báo (thể lệ/ đề tài/ mentors/ danh sách nhóm) trên Discord.",
        },
        {
            startDate: "2026-01-05T00:00:00Z",
            endDate: "2026-01-12T23:59:59Z",
            description: "Thời gian thí sinh chuẩn bị.",
        },
        {
            startDate: "2026-01-12T00:00:00Z",
            endDate: "2026-01-15T23:59:59Z",
            description: "Mở form đăng ký present thử để các bạn có cơ hội nhận xét từ Ban Giám Khảo.",
        },
        {
            startDate: "2026-01-16T00:00:00Z",
            endDate: "2026-01-16T23:59:59Z",
            description: "Thông báo thời gian present thử cho các nhóm đã đăng ký trên Discord.",
        },
        {
            startDate: "2026-01-18T00:00:00Z",
            endDate: "2026-01-20T23:59:59Z",
            description: "Thời gian present thử để nhận xét và cải thiện sản phẩm.",
        },
        {
            startDate: "2026-01-21T00:00:00Z",
            endDate: "2026-01-23T23:59:59Z",
            description: "Mở form đăng ký present chính thức (chọn thời gian và nộp sản phẩm).",
        },
        {
            startDate: "2026-01-25T00:00:00Z",
            endDate: "2026-01-25T23:59:59Z",
            description: "Thông báo phòng và thời gian present chính thức cho các nhóm trên Discord.",
        },
        {
            startDate: "2026-01-26T00:00:00Z",
            endDate: "2026-01-30T23:59:59Z",
            description: "Thời gian present chính thức.",
        },
        {
            startDate: "2026-02-02T00:00:00Z",
            endDate: "2026-02-02T23:59:59Z",
            description: "Gửi Mail thông báo kết quả.",
        },
    ];

    return (
        <section className="col-span-1" id="timeline">
            <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white">
                <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-8 sm:py-5">
                    <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Timeline</h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                        Lịch trình thực hiện Challenge Vòng 3. Timeline cũng có thể thay đổi, chúng tôi sẽ thông báo
                        trên Discord.
                    </p>
                </div>
                <div className="m-1 px-5 py-6 sm:px-8 sm:py-8">
                    <div className="relative mt-2 space-y-8">
                        <div className="bg-primary/20 absolute top-5 bottom-5 left-[15px] w-0.5" />

                        {timelineData.map((item, index) => (
                            <div key={index} className="relative flex gap-5">
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
        {active && (
            <Badge
                variant="default"
                className="absolute -top-8 -left-7 animate-pulse bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-semibold text-white shadow-xs"
            >
                Đang diễn ra
            </Badge>
        )}
        <div className="relative flex flex-col justify-center">
            <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold shadow-xs transition-all ${
                    active
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xs ring-4 ring-yellow-400/30"
                        : "bg-gray-200 text-gray-600"
                }`}
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
    <div className="flex-1 pb-1">
        <div
            className={`rounded-lg border p-4 transition-all ${
                active
                    ? "border-yellow-200 bg-gradient-to-br from-yellow-50/80 to-orange-50/50 shadow-xs"
                    : "animate__backInRight animate__animated border-gray-200/60 bg-gray-50/50"
            }`}
        >
            <div className="flex items-center gap-2.5">
                <BadgeTime date={startDate} active={active} />
                <MoveRight className={active ? "text-yellow-500" : "text-gray-400"} size={16} />
                <BadgeTime date={endDate} active={active} />
            </div>
            <p className={`mt-2.5 text-sm leading-relaxed ${active ? `font-medium text-gray-900` : `text-gray-600`}`}>
                {description}
            </p>
        </div>
    </div>
);
export const BadgeTime = ({ date, active }: { date: string; active: boolean }) => (
    <span
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            active
                ? `bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 ring-1 ring-yellow-200`
                : `bg-gray-100 text-gray-600`
        }`}
    >
        {Helper.formatDate(date)}
    </span>
);
export default Timeline;
