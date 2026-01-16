import { v4 as uuidv4 } from "uuid";
import { RoomStatus } from "~/constants/enums";
interface RoomType {
    id?: string;
    roomNumber: string;
    startTime: Date | string;
    endTime: Date | string;
    teamId: string;
    modePresent: "OFFLINE" | "ONLINE";
    presentPhase: "TRIAL" | "OFFICIAL";
}

class Room {
    id: string;
    roomNumber: string;
    startTime: Date | string;
    endTime: Date | string;
    teamId: string;
    modePresent: "OFFLINE" | "ONLINE";
    presentPhase: "TRIAL" | "OFFICIAL";

    constructor(room: RoomType) {
        this.id = room.id || uuidv4();
        this.roomNumber = room.roomNumber;
        this.startTime = room.startTime;
        this.endTime = room.endTime;
        this.teamId = room.teamId;
        this.modePresent = room.modePresent;
        this.presentPhase = room.presentPhase;
    }
}

export default Room;
export { RoomStatus };
