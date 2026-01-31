import { XCircle, AlertCircle, PartyPopper, Sparkles, Star } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import useAuth from "~/hooks/useAuth";

const DisplayResultChallenge = () => {
    const { user } = useAuth();
    const status = user?.candidate?.statusC3 || "WAITING";

    if (!status || status === "WAITING") return null;

    const statusConfig = {
        PASSED: {
            icon: PartyPopper,
            title: "Chúc mừng bạn!",
            message: "Bạn đã vượt qua Challenge 3 thành công!",
            description:
                'Bạn đã chính thức trở thành thành viên của đại gia đình <span class="text-emerald-700 font-bold">CLB F-CODE!</span>',
            bgGradient: "from-emerald-50 via-green-50 to-emerald-100",
            glowColor: "bg-emerald-400/20",
            borderColor: "border-emerald-200/50",
            iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400",
            badgeClass: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200",
            badgeText: "Vượt qua",
            ornamentColor: "text-emerald-400",
        },
        FAILED: {
            icon: XCircle,
            title: "Thông báo kết quả",
            message: "Bạn chưa vượt qua Challenge 3",
            description: `
                Cảm ơn bạn đã cháy hết mình tại <b>New Wave: The Chosen One</b>. Dù chưa thể đồng hành cùng nhau lúc này, F-Code vẫn đánh giá rất cao nỗ lực của bạn tại Challenge 3. <br/><br/>
                Đừng để kết quả này dừng bước, hãy giữ vững đam mê nhé! Nếu có thắc mắc hoặc khiếu nại về kết quả, vui lòng liên hệ qua email: <a href="mailto:fcode.fptuhcm@gmail.com" class="text-rose-600 font-bold underline">fcode.fptuhcm@gmail.com</a>.
            `,
            bgGradient: "from-rose-50 via-red-50 to-orange-50",
            glowColor: "bg-rose-400/20",
            borderColor: "border-rose-200/50",
            iconBg: "bg-gradient-to-tr from-rose-500 to-red-400",
            badgeClass: "bg-rose-500 hover:bg-rose-600 shadow-rose-200",
            badgeText: "Chưa vượt qua",
            ornamentColor: "text-rose-400",
        },
        REDO: {
            icon: AlertCircle,
            title: "Thông báo về đề tài",
            message: "Bạn cần làm lại đề tài",
            description:
                "Đừng lo nhé, F-Code sẽ tạo điều kiện để bạn hoàn thiện lại bài thi tốt nhất. Hãy liên hệ ngay với BTC để được hỗ trợ!",
            bgGradient: "from-amber-50 via-orange-50 to-yellow-100",
            glowColor: "bg-orange-400/20",
            borderColor: "border-orange-200/50",
            iconBg: "bg-gradient-to-tr from-orange-500 to-amber-400",
            badgeClass: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
            badgeText: "Làm lại",
            ornamentColor: "text-orange-400",
        },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
        <div className="group perspective-1000 relative">
            <div
                className={`animate-in fade-in zoom-in-95 relative overflow-hidden rounded-[2rem] border duration-700 ${config.borderColor} bg-gradient-to-br ${config.bgGradient} p-1 shadow-xs transition-all hover:shadow-emerald-500/10`}
            >
                <div
                    className={`absolute -top-4 -right-4 h-40 w-40 rounded-full ${config.glowColor} animate-pulse blur-3xl`}
                />
                <div
                    className={`absolute -bottom-10 -left-10 h-40 w-40 rounded-full ${config.glowColor} blur-3xl delay-700`}
                />

                {/* Inner Card với hiệu ứng Glass */}
                <div className="relative overflow-hidden rounded-[1.8rem] bg-white/40 px-6 py-10 backdrop-blur-xl sm:px-12">
                    {/* Các icon bay trang trí */}
                    <div className="pointer-events-none absolute inset-0">
                        <Sparkles
                            className={`absolute top-10 right-10 h-6 w-6 ${config.ornamentColor} animate-bounce opacity-40`}
                        />
                        <Star
                            className={`absolute bottom-10 left-10 h-5 w-5 ${config.ornamentColor} animate-pulse opacity-30`}
                        />
                        {status === "PASSED" && (
                            <PartyPopper className="animate-floating absolute top-20 left-15 h-8 w-8 -rotate-12 text-yellow-400/30" />
                        )}
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div
                                className={`absolute inset-0 rounded-full ${config.iconBg} animate-pulse opacity-40 blur-xl`}
                            />
                            <div
                                className={`relative flex h-20 w-20 items-center justify-center rounded-full ${config.iconBg} shadow-inner ring-4 ring-white/80`}
                            >
                                <Icon className="h-10 w-10 text-white drop-shadow-md" />
                            </div>
                        </div>

                        <Badge
                            className={`${config.badgeClass} mb-4 px-4 py-1 text-xs tracking-wider text-white uppercase shadow-lg transition-transform group-hover:scale-105`}
                        >
                            {config.badgeText}
                        </Badge>

                        <h2 className="mb-2 text-2xl font-black tracking-tight text-gray-900 sm:text-4xl">
                            {config.title}
                        </h2>

                        <p
                            className={`mb-6 text-lg font-bold ${status === "PASSED" ? "text-emerald-600" : "text-gray-700"} sm:text-2xl`}
                        >
                            {config.message}
                        </p>

                        <div
                            className="max-w-xl text-sm leading-relaxed text-gray-600 italic opacity-90 sm:text-lg"
                            dangerouslySetInnerHTML={{ __html: config.description }}
                        />
                    </div>
                </div>
            </div>

            <div className={`mx-auto h-4 w-4/5 rounded-[100%] ${config.glowColor} blur-2xl`} />
        </div>
    );
};

export default DisplayResultChallenge;
