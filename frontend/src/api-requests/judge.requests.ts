import type { ResponseDetailData } from "~/types/team.types";
import { privateApi } from "~/utils/axiosInstance";

export type RoomType = {
    id: string;
    presentPhase: "TRIAL" | "OFFICIAL";
    modePresent: "OFFLINE" | "ONLINE";
    roomNumber: string;
    startTime: string;
    endTime: string | null;
    teamId: string | null;
    team: {
        id: string;
        group: number;
        name: string | null;
        topic: {
            title: string;
        };
    } | null;
};

export type TeamDetailType = {
    id: string;
    group: number;
    name: string | null;
    topicId: string;
    leaderId: string | null;
    topic: {
        id: string;
        title: string;
    };
    candidates: {
        id: string;
        studentCode: string;
        phone: string;
        major: string;
        user: {
            id: string;
            fullName: string;
            email: string;
        };
    }[];
    leader: {
        id: string;
    } | null;
};

class JudgeApi {
    static async getJudgeRooms() {
        const res = await privateApi.get<ResponseDetailData<RoomType[]>>("/judge/rooms");
        return res.data;
    }

    static async getTeamsByRoom(roomId: string) {
        const res = await privateApi.get<ResponseDetailData<TeamDetailType>>(`/judge/rooms/${roomId}/teams`);
        return res.data;
    }
}

export default JudgeApi;
