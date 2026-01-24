import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";

const useGetInfoJudge = (judgeId: string) => {
    if (!judgeId) {
        throw new Error("judgeId is required");
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ["judge", "info", judgeId],
        queryFn: async () => {
            const res = await JudgeApi.getJudgeInfo(judgeId);
            return res.result;
        },
        enabled: !!judgeId,
    });
    return { data, isLoading, error };
};
export default useGetInfoJudge;
