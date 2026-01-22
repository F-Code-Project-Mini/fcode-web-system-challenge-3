import { XCircle, AlertCircle, PartyPopper, Sparkles } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import useAuth from "~/hooks/useAuth";

const DisplayResultChallenge = () => {
    const { user } = useAuth();
    const status = user.candidate?.statusC3 || "WAITING";

    if (!status || status === "WAITING") {
        return null;
    }

    const statusConfig = {
        PASSED: {
            icon: PartyPopper,
            title: "Chúc mừng bạn!",
            message: "Bạn đã vượt qua Challenge 3 thành công!",
            description:
                'Chúc mừng bạn đã hoàn thành xuất sắc Challenge 3. Bạn đã chính thức trở thành một phần của <b class="text-primary font-bold">CLB F-Code!</b>',
            bgGradient: "bg-gradient-to-br from-green-50 via-emerald-50 to-primary/60",
            borderColor: "border-green-300/60",
            iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
            badgeBg: "bg-green-500",
            badgeText: "Vượt qua",
            confetti: true,
        },
        FAILED: {
            icon: XCircle,
            title: "Thông báo kết quả",
            message: "Bạn chưa vượt qua Challenge 3",
            description:
                "Đừng nản lòng! Hãy rút kinh nghiệm và chuẩn bị tốt hơn cho các cơ hội tiếp theo. Mỗi thất bại đều là bài học quý giá.",
            bgGradient: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50",
            borderColor: "border-red-300/60",
            iconBg: "bg-gradient-to-br from-red-400 to-rose-500",
            badgeBg: "bg-red-500",
            badgeText: "Chưa vượt qua",
            confetti: false,
        },
        REDO: {
            icon: AlertCircle,
            title: "Thông báo về đề tài",
            message: "Bạn cần làm lại đề tài",
            description:
                "Tụi mình biết bạn vừa gặp phải sự cố không mong muốn trong quá trình thực hiện thử thách. Đừng lo nhé, F-Code sẽ tạo điều kiện để bạn hoàn thiện lại bài thi tốt nhất. Hãy liên hệ ngay với BTC để được hỗ trợ và bắt đầu lại nha!",
            bgGradient: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
            borderColor: "border-orange-300/60",
            iconBg: "bg-gradient-to-br from-orange-400 to-amber-500",
            badgeBg: "bg-orange-500",
            badgeText: "Làm lại",
            confetti: false,
        },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
        <div
            className={`animate-in fade-in slide-in-from-top-4 relative overflow-hidden rounded-lg border ${config.borderColor} ${config.bgGradient} `}
        >
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-white/20 blur-xl" />

            {config.confetti && (
                <>
                    <Sparkles className="absolute top-4 right-4 h-6 w-6 animate-pulse text-yellow-500" />
                    <Sparkles className="absolute top-8 right-12 h-4 w-4 animate-pulse text-green-500 delay-300" />
                    <Sparkles className="absolute top-12 right-6 h-5 w-5 animate-pulse text-blue-500 delay-500" />
                </>
            )}

            <div className="relative p-6">
                <div className="flex flex-col items-center text-center">
                    <div
                        className={`mb-2 flex h-16 w-16 items-center justify-center rounded-full ${config.iconBg} shadow-lg ring-4 ring-white/50`}
                    >
                        <Icon className="h-10 w-10 text-white" />
                    </div>

                    <Badge variant={"destructive"} className={`${config.badgeBg} mt-2`}>
                        {config.badgeText}
                    </Badge>

                    <h2 className="mt-1 mb-3 text-lg font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {config.title}
                    </h2>

                    <p className="mb-4 text-lg font-semibold text-gray-700 sm:text-xl">{config.message}</p>

                    <p
                        className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: config.description }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DisplayResultChallenge;
