import type {
    OfficialScheduleDateType,
    ResponseDetailData,
    ScheduleDateType,
    SchedulePresentType,
    SubmissionResponseType,
    SubmissionType,
    TeamType,
} from "~/types/team.types";
import { privateApi } from "~/utils/axiosInstance";

class TeamApi {
    static async getAllTeams() {
        const res = await privateApi.get<ResponseDetailData<TeamType[]>>("/teams");
        return res.data;
    }

    static async getTeamById(id: string) {
        const res = await privateApi.get<ResponseDetailData<TeamType>>(`/teams/${id}`);
        return res.data;
    }

    static async getTeamByMentorId(id: string) {
        const res = await privateApi.get<ResponseDetailData<TeamType[]>>(`/teams/mentor/${id}`);
        return res.data;
    }
    static async setLeader(idTeam: string, idMember: string) {
        const res = await privateApi.patch(`/teams/${idTeam}/set-leader`, {
            candidate_id: idMember,
        });
        return res.data;
    }
    static async changeNameTeam(idTeam: string, newName: string) {
        const res = await privateApi.patch(`/teams/${idTeam}/change-name`, {
            name: newName,
        });
        return res.data;
    }
    static async createSchedulePresentation({
        teamId,
        trialDate,
        officialDate,
    }: {
        teamId: string;
        trialDate: string;
        officialDate: string[];
    }) {
        const res = await privateApi.post(`/teams/present`, { teamId, trialDate, officialDate });
        return res.data;
    }
    static async getSchedulePresentationAll() {
        const res = await privateApi.get<
            ResponseDetailData<{
                trialSchedules: ScheduleDateType[];
                officialSchedules: OfficialScheduleDateType[];
            }>
        >(`/teams/get-schedule-all`);
        return res.data;
    }
    static async getSchedulePresentationInTeam(teamId: string) {
        const res = await privateApi.get<ResponseDetailData<SchedulePresentType>>(`/teams/get-schedule/${teamId}`);
        return res.data;
    }

    static async getSubmissionInTeam(teamId: string) {
        const res = await privateApi.get<ResponseDetailData<SubmissionResponseType[]>>(`/teams/${teamId}/submissions`);
        return res.data;
    }

    static async submissions(teamId: string, data: SubmissionType) {
        const res = await privateApi.post<ResponseDetailData<string>>(`/teams/${teamId}/submissions`, data);
        return res.data;
    }
}
export default TeamApi;
