import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import adminRepository from "~/repositories/admin.repository";
import userRepository from "~/repositories/user.repository";

class AdminService {
    public getAllUsers = async () => {
        const users = await adminRepository.getAllUsers();
        const usersWithScore = await Promise.all(
            users.map(async (user) => {
                if (!user.candidate) {
                    return { ...user, mentorScore: null, avgPresentScore: null, total: null };
                }

                const score = await userRepository.getScoreMentor(user.candidate.id);
                const { mentorScore = null, avgPresentScore = null } = score || {};

                const total =
                    mentorScore !== null && avgPresentScore !== null
                        ? Number(((mentorScore + avgPresentScore) / 2).toFixed(2))
                        : null;

                return { ...user, mentorScore, avgPresentScore, total };
            }),
        );

        return usersWithScore.sort((a, b) => {
            if (a.total === null) return 1;
            if (b.total === null) return -1;
            return b.total - a.total;
        });
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

    public createUser = async (email: string, fullName: string, role: number[]) => {
        const user = await adminRepository.createUser(email, fullName, role);

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

        return rooms;
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
                        const score = await userRepository.getScoreJudge(
                            jr.judge.id,
                            candidate.id,
                            "OFFICIAL_PRESENTATION",
                        );
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

    public addJudgeToRoom = async (judgeIds: string[], roomId: string) => {
        let addedCount = 0;
        const errors: string[] = [];

        for (const judgeId of judgeIds) {
            try {
                const user = await adminRepository.getUserById(judgeId);
                if (!user) {
                    errors.push(`Judge với ID ${judgeId} không tồn tại`);
                    continue;
                }

                const hasJudgeRole = await userRepository.hasRole(user.id, RoleType.JUDGE);
                if (!hasJudgeRole) {
                    errors.push(`${user.fullName} không có role JUDGE`);
                    continue;
                }

                const isAlreadyInRoom = await adminRepository.isJudgeInRoom(judgeId, roomId);
                if (isAlreadyInRoom) {
                    errors.push(`${user.fullName} đã được thêm vào phòng này rồi`);
                    continue;
                }

                await adminRepository.addJudgeToRoom(judgeId, roomId);
                addedCount++;
            } catch (error) {
                errors.push(`Lỗi khi thêm judge ${judgeId}`);
            }
        }

        if (addedCount === 0) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: errors.length > 0 ? errors.join(", ") : "Không thể thêm judge nào!",
            });
        }

        return {
            message: `Thêm ${addedCount} judge(s) vào phòng thành công!`,
            added: addedCount,
            errors: errors.length > 0 ? errors : undefined,
        };
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

        const teamsWithScores = await Promise.all(
            teams.map(async (team) => {
                const candidatesWithScores = await Promise.all(
                    team.candidates.map(async (candidate) => {
                        const score = await userRepository.getScoreMentor(candidate.id);
                        const scoreMentor = score?.mentorScore || 0;

                        const scoreJudge = score?.avgPresentScore || 0;

                        return {
                            ...candidate,
                            scoreMentor: scoreMentor || null,
                            scoreJudge,
                        };
                    }),
                );

                const teamScore = await userRepository.getTeamScores(team.id);

                return {
                    ...team,
                    candidates: candidatesWithScores,
                    teamScore,
                };
            }),
        );

        return teamsWithScores;
    };
}

const adminService = new AdminService();
export default adminService;
