import type { BaremResultItem } from "~/types/barem";
import type { ResponseDetailData } from "~/types/team.types";
import { privateApi } from "~/utils/axiosInstance";

class MentorApi {
    static async getBarem(candidateId: string) {
        const res = await privateApi.get<ResponseDetailData<BaremResultItem[]>>(`/mentor/get-barem/${candidateId}`);
        return res.data;
    }
    static async updateNote(candidateId: string, note: string, codeBarem: string) {
        const res = await privateApi.patch(`/mentor/candidates/${candidateId}/note`, { note, codeBarem });
        return res.data;
    }
}
export default MentorApi;
