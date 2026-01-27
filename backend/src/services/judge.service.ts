import { HTTP_STATUS } from "~/constants/httpStatus";
import judgeRepository from "~/repositories/judge.repository";
import userRepository from "~/repositories/user.repository";
import { ErrorWithStatus } from "~/rules/error";

class JudgeService {
    async getJudgeRooms(judgeId: string) {
        const rooms = await judgeRepository.findRoomsByJudgeId(judgeId);

        // const roomsWithScores = await Promise.all(
        //     rooms.map(async (room) => {
        //         if (!room.team || !('candidates' in room.team) || !room.team.candidates) {
        //             return room;
        //         }

        //         const candidateScores = await Promise.all(
        //             room.team.candidates.map(async (candidate) => {
        //                 const score = await userRepository.getScoreMentor(judgeId, candidate.id, "JUDGE");
        //                 return score || 0;
        //             }),
        //         );

        //         const totalScore = candidateScores.reduce((sum, s) => sum + s, 0);

        //         return {
        //             ...room,
        //             myScore: totalScore,
        //             hasScored: totalScore > 0,
        //         };
        //     }),
        // );

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

        const team = await judgeRepository.findTeamsByRoomId(roomId, judgeId);

        if (!team) return null;

        const candidatesWithScores = await Promise.all(
            team.candidates.map(async (candidate) => {
                const scoreJudge = await userRepository.getScoreJudge(judgeId, candidate.id, "OFFICIAL_PRESENTATION");
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
    async getDetailRoom(roomId: string) {
        const room = await judgeRepository.getDetailRoom(roomId);
        return room;
    }
    updateNote = async (judgeId: string, teamId: string, note: string) => {
        const updatedJudge = await judgeRepository.updateNote(judgeId, teamId, note);
        return updatedJudge;
    };
}

export default new JudgeService();
