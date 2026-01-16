import { HTTP_STATUS } from "~/constants/httpStatus";
import judgeRepository from "~/repositories/judge.repository";
import userRepository from "~/repositories/user.repository";
import { ErrorWithStatus } from "~/rules/error";

class JudgeService {
    async getJudgeRooms(judgeId: string) {
        const rooms = await judgeRepository.findRoomsByJudgeId(judgeId);
        return rooms;
    }

    async getTeamsByRoom(judgeId: string, roomId: string) {
        const isAssigned = await judgeRepository.verifyJudgeInRoom(judgeId, roomId);
        if (!isAssigned) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Bạn không có quyền truy cập phòng này.",
            });
        }

        const team = await judgeRepository.findTeamsByRoomId(roomId);

        if (!team) return null;

        const candidatesWithScores = await Promise.all(
            team.candidates.map(async (candidate) => {
                const scoreJudge = await userRepository.getScoreMentor(judgeId, candidate.id, "JUDGE");
                return {
                    ...candidate,
                    scoreJudge,
                };
            }),
        );

        return {
            ...team,
            candidates: candidatesWithScores,
        };
    }
}

export default new JudgeService();
