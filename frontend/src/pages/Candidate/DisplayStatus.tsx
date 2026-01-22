import { CircleSlash, Loader, PartyPopper, Undo2 } from "lucide-react";
import type { StatusC3 } from "~/types/user.types";

const DisplayResult = ({ status }: { status: StatusC3 }) => {
    switch (status) {
        case "WAITING":
            return (
                <span className="flex items-center gap-1 text-yellow-500">
                    <Loader size={15} /> Chờ kết quả
                </span>
            );
        case "FAILED":
            return (
                <span className="flex items-center gap-1 font-semibold text-red-500">
                    <CircleSlash size={15} /> Chưa đạt
                </span>
            );
        case "PASSED":
            return (
                <span className="flex items-center gap-1 font-semibold text-green-500">
                    <PartyPopper size={15} /> Vượt qua
                </span>
            );
        case "REDO":
            return (
                <span className="flex items-center gap-1 font-semibold text-rose-400">
                    <Undo2 size={15} /> Làm lại đề tài
                </span>
            );
    }
};
export default DisplayResult;
