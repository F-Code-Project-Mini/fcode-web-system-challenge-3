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
        return rooms;
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
        const teamRoom = rooms.find((room) => room.team?.id === teamId);

        if (!teamRoom || !teamRoom.judgeRooms || teamRoom.judgeRooms.length === 0) {
            return null;
        }

        // Lấy điểm từ từng judge và tính trung bình
        const scores = await Promise.all(
            teamRoom.judgeRooms.map(async (jr) => {
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
