import type { StatusC3 } from "~/types/user.types";

interface ResultBadgeProps {
    status: StatusC3;
    isBg?: boolean;
}

const ResultBadge = ({ status, isBg = true }: ResultBadgeProps) => {
    if (status === "WAITING") return null;

    const config = {
        PASSED: {
            containerBg: "bg-green-50/40",
            borderColor: "border-green-500",
            textColor: "text-green-600",
            label: "Đậu",
            rotation: "-rotate-12",
        },
        FAILED: {
            containerBg: "bg-red-50/40",
            borderColor: "border-red-500",
            textColor: "text-red-600",
            label: "Rớt",
            rotation: "rotate-12",
        },
        REDO: {
            containerBg: "bg-yellow-50/40",
            borderColor: "border-yellow-500",
            textColor: "text-yellow-600",
            label: "Thi lại",
            rotation: "rotate-0",
        },
    };

    const current = config[status as keyof typeof config];

    return (
        <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-end pr-4 transition-all ${
                isBg ? current.containerBg : ""
            }`}
        >
            <div
                className={`animate-in fade-in zoom-in flex items-center justify-center rounded-md border-2 bg-white/90 px-3 py-1 shadow-sm duration-300 ${current.borderColor} ${current.rotation}`}
            >
                <span className={`text-[10px] font-black tracking-widest uppercase ${current.textColor}`}>
                    {current.label}
                </span>
            </div>
        </div>
    );
};

export default ResultBadge;
