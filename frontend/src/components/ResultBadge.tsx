import { PartyPopper } from "lucide-react";
import type { StatusC3 } from "~/types/user.types";

interface ResultBadgeProps {
    status: StatusC3;
    isBg?: boolean;
}

const ResultBadge = ({ status, isBg = true }: ResultBadgeProps) => {
    type ConfigItem = {
        containerBg: string;
        borderColor: string;
        textColor: string;
        label: string;
        rotation: string;
        Icon?: React.ComponentType<{ className?: string }>;
    };

    const config: Record<string, ConfigItem> = {
        WAITING: {
            containerBg: "bg-yellow-50/40",
            borderColor: "border-yellow-400",
            textColor: "text-yellow-500",
            label: "Chờ KQ",
            rotation: "rotate-0",
        },
        PASSED: {
            containerBg: "bg-green-50/40",
            borderColor: "border-green-500",
            textColor: "text-green-600",
            Icon: PartyPopper,
            label: " Pass",
            rotation: "-rotate-12",
        },
        FAILED: {
            containerBg: "bg-red-50/40",
            borderColor: "border-red-500",
            textColor: "text-red-600",
            label: "Fail",
            rotation: "rotate-12",
        },
        REDO: {
            containerBg: "bg-amber-50/40",
            borderColor: "border-amber-500",
            textColor: "text-amber-600",
            label: "Làm lại",
            rotation: "rotate-0",
        },
    };

    const current = config[status as keyof typeof config];

    return (
        <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-end pr-2 transition-all sm:pr-4 ${
                isBg ? current.containerBg : ""
            }`}
        >
            <div
                className={`animate-in fade-in zoom-in flex items-center justify-center rounded border-2 bg-white/90 px-2 py-0.5 shadow-sm duration-300 sm:rounded-md sm:px-3 sm:py-1 ${current.borderColor} ${current.rotation}`}
            >
                <span
                    className={`text-[8px] font-black tracking-wide uppercase sm:tracking-widest ${current.textColor}`}
                >
                    {current?.Icon && <current.Icon className="mr-1 inline h-3 w-3" />}
                    {current.label}
                </span>
            </div>
        </div>
    );
};

export default ResultBadge;
