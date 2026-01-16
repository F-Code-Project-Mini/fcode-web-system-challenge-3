import { HTTP_STATUS } from "~/constants/httpStatus";
import judgeRepository from "~/repositories/judge.repository";
import { ErrorWithStatus } from "~/rules/error";

class JudgeService {
    async getJudgeRooms(judgeId: string) {
        const rooms = await judgeRepository.findRoomsByJudgeId(judgeId);
        return rooms;
    }

    async getTeamsByRoom(judgeId: string, roomId: string) {
        // Verify judge is assigned to this room
        const isAssigned = await judgeRepository.verifyJudgeInRoom(judgeId, roomId);
        if (!isAssigned) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Bạn không có quyền truy cập phòng này.",
            });
        }

        const teams = await judgeRepository.findTeamsByRoomId(roomId);
        return teams;
    }
}

export default new JudgeService();
