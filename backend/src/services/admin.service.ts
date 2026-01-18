import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import adminRepository from "~/repositories/admin.repository";
import AlgoCrypoto from "~/utils/crypto";

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

        return user;
    };

    public createUser = async (email: string, fullName: string) => {
        const defaultPassword = "123456aA";
        const hashedPassword = await AlgoCrypoto.hashPassword(defaultPassword);

        const user = await adminRepository.createUser(email, fullName, hashedPassword);

        return {
            ...user,
            password: undefined,
            defaultPassword,
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

        const existingRole = user.roles?.includes(roleName);
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
        return await adminRepository.getAllRooms();
    };

    public addJudgeToRoom = async (judgeId: string, roomId: string) => {
        const user = await adminRepository.getUserById(judgeId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Judge không tồn tại!",
            });
        }

        const hasJudgeRole = user.roles?.includes(RoleType.JUDGE);
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
}

const adminService = new AdminService();
export default adminService;
