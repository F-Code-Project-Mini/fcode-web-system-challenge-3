import { judgeRooms } from "./../seeders/data-raw/rooms";
import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import adminRepository from "~/repositories/admin.repository";
import userRepository from "~/repositories/user.repository";

class AdminService {
    public getAllUsers = async () => {
        const users = await adminRepository.getAllUsers();
        return users;
    };

    public getUserById = async (userId: string) => {
        const user = await adminRepository.getUserById(userId);

        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại!",
            });
        }

        return {
            ...user,
            judgeRooms: user.judgeRooms?.map((jr) => jr.room),
        };
    };

    public createUser = async (email: string, fullName: string) => {
        const user = await adminRepository.createUser(email, fullName);

        return {
            ...user,
            password: undefined,
        };
    };

    public addRoleToUser = async (userId: string, roleName: RoleType) => {
        const user = await adminRepository.getUserById(userId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại!",
            });
        }

        const roleId = await adminRepository.getRoleIdByName(roleName);
        if (!roleId) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Role không tồn tại!",
            });
        }

        const existingRole = user.userRoles.some((ur) => ur.role.role === roleName);
        if (existingRole) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "User đã có role này rồi!",
            });
        }

        await adminRepository.addRoleToUser(userId, roleId);

        return { message: "Thêm role thành công!" };
    };

    public removeRoleFromUser = async (userId: string, roleId: number) => {
        const user = await adminRepository.getUserById(userId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại!",
            });
        }

        await adminRepository.removeRoleFromUser(userId, roleId);

        return { message: "Xóa role thành công!" };
    };

    public getAllRooms = async () => {
        const rooms = await adminRepository.getAllRooms();

        // Thêm điểm cho mỗi phòng (không trả về judgeRooms)
        const roomsWithScores = await Promise.all(
            rooms.map(async (room) => {
                if (!room.team || !room.judgeRooms || room.judgeRooms.length === 0) {
                    return {
                        id: room.id,
                        roomNumber: room.roomNumber,
                        presentPhase: room.presentPhase,
                        modePresent: room.modePresent,
                        startTime: room.startTime,
                        endTime: room.endTime,
                        team: room.team,
                        _count: room._count,
                        teamScore: null,
                    };
                }

                // Lấy điểm từ tất cả judges
                const judgeScores = await Promise.all(
                    room.judgeRooms.map(async (jr) => {
                        const candidateScores = await Promise.all(
                            room.team!.candidates.map(async (candidate) => {
                                const score = await userRepository.getScoreMentor(jr.judge.id, candidate.id, "JUDGE");
                                return score || 0;
                            }),
                        );
                        return candidateScores.reduce((sum, s) => sum + s, 0);
                    }),
                );

                // Tính teamScore: TRIAL = tổng, OFFICIAL = trung bình
                let teamScore = null;
                const scoredJudges = judgeScores.filter((s) => s > 0);
                if (scoredJudges.length > 0) {
                    if (room.presentPhase === "TRIAL") {
                        // TRIAL: chỉ lấy tổng điểm của judge duy nhất (không tính TB)
                        teamScore = scoredJudges[0];
                    } else {
                        // OFFICIAL: tính trung bình
                        teamScore = scoredJudges.reduce((sum, s) => sum + s, 0) / scoredJudges.length;
                    }
                }

                return {
                    id: room.id,
                    roomNumber: room.roomNumber,
                    presentPhase: room.presentPhase,
                    modePresent: room.modePresent,
                    startTime: room.startTime,
                    endTime: room.endTime,
                    team: room.team,
                    _count: room._count,
                    teamScore,
                };
            }),
        );

        return roomsWithScores;
    };

    public getRoomDetail = async (roomId: string) => {
        const room = await adminRepository.getRoomDetail(roomId);
        if (!room) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Phòng chấm không tồn tại!",
            });
        }

        if (!room.team) {
            return room;
        }

        // Xác định type dựa vào present_phase
        const scoreType = room.presentPhase === "TRIAL" ? "TRIAL_PRESENTATION" : "OFFICIAL_PRESENTATION";

        // Tính điểm cho từng judge
        const judgesWithScores = await Promise.all(
            room.judgeRooms.map(async (jr) => {
                // Lấy điểm của judge này cho tất cả candidates trong team
                const candidateScores = await Promise.all(
                    room.team!.candidates.map(async (candidate) => {
                        const score = await userRepository.getScoreMentor(jr.judge.id, candidate.id, "JUDGE");
                        return {
                            candidateId: candidate.id,
                            candidateName: candidate.user?.fullName,
                            score: score || 0,
                        };
                    }),
                );

                const totalScore = candidateScores.reduce((sum, c) => sum + c.score, 0);

                return {
                    id: jr.id,
                    judge: jr.judge,
                    totalScore: totalScore,
                    candidateScores,
                    hasScored: totalScore > 0,
                };
            }),
        );

        return {
            ...room,
            judgeRooms: judgesWithScores,
        };
    };

    public addJudgeToRoom = async (judgeId: string, roomId: string) => {
        const user = await adminRepository.getUserById(judgeId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Judge không tồn tại!",
            });
        }

        const hasJudgeRole = user.userRoles.some((ur) => ur.role.role === RoleType.JUDGE);
        if (!hasJudgeRole) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "User này không có role JUDGE!",
            });
        }

        await adminRepository.addJudgeToRoom(judgeId, roomId);

        return { message: "Thêm judge vào phòng thành công!" };
    };

    public removeJudgeFromRoom = async (judgeRoomId: string) => {
        await adminRepository.removeJudgeFromRoom(judgeRoomId);

        return { message: "Xóa judge khỏi phòng thành công!" };
    };

    public getJudgeUsers = async () => {
        return await adminRepository.getJudgeUsers();
    };

    public getAllTeams = async () => {
        const teams = await adminRepository.getAllTeams();

        // Thêm điểm đánh giá cho từng candidate
        const teamsWithScores = await Promise.all(
            teams.map(async (team) => {
                const candidatesWithScores = await Promise.all(
                    team.candidates.map(async (candidate) => {
                        // Lấy điểm mentor
                        const scoreMentor = await userRepository.getScoreMentor(
                            team.mentorship.mentorId,
                            candidate.id,
                            "MENTOR",
                        );

                        // Lấy điểm judge (OFFICIAL_PRESENTATION)
                        // Tím judge room của team này
                        const scoreJudge = await this.getJudgeScoresForCandidate(team.id, candidate.id);

                        return {
                            ...candidate,
                            scoreMentor: scoreMentor || null,
                            scoreJudge,
                        };
                    }),
                );

                return {
                    ...team,

                    candidates: candidatesWithScores,
                };
            }),
        );

        return teamsWithScores;
    };

    private getJudgeScoresForCandidate = async (teamId: string, candidateId: string): Promise<number | null> => {
        // Lấy tất cả judges của team thông qua room
        const rooms = await adminRepository.getAllRooms();
        const teamRoom = rooms.find((room) => room.team?.id === teamId && room.presentPhase === "OFFICIAL");

        if (!teamRoom) {
            return null;
        }

        // Lấy chi tiết phòng để có judges
        const roomDetail = await adminRepository.getRoomDetail(teamRoom.id);
        if (!roomDetail || !roomDetail.judgeRooms || roomDetail.judgeRooms.length === 0) {
            return null;
        }

        // Xác định type dựa vào present_phase: TRIAL hoặc OFFICIAL
        const scoreType = roomDetail.presentPhase === "TRIAL" ? "TRIAL_PRESENTATION" : "OFFICIAL_PRESENTATION";

        // Lấy điểm từ từng judge và tính trung bình
        const scores = await Promise.all(
            roomDetail.judgeRooms.map(async (jr) => {
                const score = await userRepository.getScoreMentor(jr.judge.id, candidateId, "JUDGE");
                return score || 0;
            }),
        );

        // Tính điểm trung bình
        const totalScore = scores.reduce((sum, s) => sum + s, 0);
        return scores.length > 0 ? totalScore / scores.length : null;
    };
}

const adminService = new AdminService();
export default adminService;
