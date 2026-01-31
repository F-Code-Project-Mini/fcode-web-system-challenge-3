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
type ApproveMemberProps = {
    value: string;
    candidateId: string;
    socket?: Socket;
};
const ApproveMember = ({ value, candidateId, socket }: ApproveMemberProps) => {
    return (
        <Select
            defaultValue={value}
            onValueChange={(newValue) => socket?.emit("APPROVE_CANDIDATE", { candidateId, status: newValue })}
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
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ApproveMember;
