import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import { Socket } from "socket.io-client";
import type { StatusC3 } from "~/types/user.types";
type ApproveMemberProps = {
    value: string;
    candidateId: string;
    socket?: Socket;
    handleStatusChange?: (candidateId: string, status: StatusC3) => void;
};
const ApproveMember = ({ value, candidateId, socket, handleStatusChange }: ApproveMemberProps) => {
    return (
        <Select
            defaultValue={value}
            onValueChange={(newValue) => {
                socket?.emit("APPROVE_CANDIDATE", { candidateId, status: newValue });
                handleStatusChange?.(candidateId, newValue as StatusC3);
            }}
        >
            <SelectTrigger className="w-full max-w-48 bg-white">
                <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    <SelectItem value="WAITING">Chờ xử lý</SelectItem>
                    <SelectItem value="PASSED">Duyệt</SelectItem>
                    <SelectItem value="FAILED">Loại</SelectItem>
                    <SelectItem value="REDO">Làm lại</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ApproveMember;
