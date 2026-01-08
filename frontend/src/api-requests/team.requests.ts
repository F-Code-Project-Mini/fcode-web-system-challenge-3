import type { ResponseDetailData, TeamType } from "~/types/team.types";
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
}
export default TeamApi;
