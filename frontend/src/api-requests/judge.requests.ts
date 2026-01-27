import type { RoomDetailType } from "~/types/admin.types";
import type { BaremResultItem } from "~/types/barem";
import type { ResponseDetailData, SchedulePresent, SubmissionResponseType } from "~/types/team.types";
import type { StatusC3, UserType } from "~/types/user.types";
import { privateApi } from "~/utils/axiosInstance";

export type RoomType = {
    id: string;
    presentPhase: "TRIAL" | "OFFICIAL";
    modePresent: "OFFLINE" | "ONLINE";
    roomNumber: string;
    startTime: string;
    endTime: string;
    teamId: string;
    team: {
        id: string;
        group: number;
        name: string | null;
        topic: {
            title: string;
        };
        schedulePresent: {
            googleMeetLink: string;
            videoRecord: string;
        } | null;
    } | null;
};

export type SubmissionType = {
    id: string;
    slideLink: string;
    taskAssignmentLink: string;
    productLinks: string[];
    note: string | null;
    submittedAt: string;
    user: {
        fullName: string;
    };
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
        filePath: string;
    };
    candidates: {
        id: string;
        studentCode: string;
        phone: string;
        major: string;
        semester: string;
        statusC3: StatusC3;
        user: {
            id: string;
            fullName: string;
            email: string;
        };
        scoreJudge: number;
    }[];
    leader: {
        id: string;
    } | null;
    submissions: SubmissionResponseType[];
    schedulePresent: SchedulePresent;
    noteJudges: {
        note: string;
    }[] | null;
};

class JudgeApi {
    static async getJudgeRooms() {
        const res = await privateApi.get<ResponseDetailData<RoomType[]>>("/judge/rooms");
        return res.data;
    }

    static async getJudgeInfo(judgeId: string) {
        const res = await privateApi.get<ResponseDetailData<UserType>>(`/judge/info/${judgeId}`);
        return res.data;
    }

    static async getTeamsByRoom(roomId: string, judgeId: string) {
        const res = await privateApi.get<ResponseDetailData<TeamDetailType>>(`/judge/rooms/${roomId}/${judgeId}/teams`);
        return res.data;
    }

    static async getBarem(candidateId: string, roomId: string) {
        const res = await privateApi.get<ResponseDetailData<BaremResultItem[]>>(
            `/judge/get-barem/${candidateId}/${roomId}`,
        );
        return res.data;
    }
    static async getBaremTeam(candidateId: string) {
        const res = await privateApi.get<ResponseDetailData<BaremResultItem[]>>(`/judge/get-barem/${candidateId}/team`);
        return res.data;
    }
    static async getDetailRoom(roomId: string) {
        const res = await privateApi.get<ResponseDetailData<RoomDetailType>>(`/judge/rooms/${roomId}`);
        return res.data;
    }
    static async updateNoteTeam(teamId: string, note: string) {
        const res = await privateApi.patch(`/judge/teams/${teamId}`, { note });
        return res.data;
    }
}

export default JudgeApi;
