import type { ResponseDetailData, ResponsePaginate, TeamType } from "~/types/team.types";
import { privateApi } from "~/utils/axiosInstance";

class TeamApi {
    static async getAllTeams() {
        const res = await privateApi.get<ResponsePaginate<TeamType[]>>("/teams");
        return res.data;
    }

    static async getTeamById(id: string) {
        const res = await privateApi.get<ResponseDetailData<TeamType>>(`/teams/${id}`);
        return res.data;
    }
}
export default TeamApi;
