import type {
    AddJudgeToRoomRequest,
    AddRoleRequest,
    AdminRoomType,
    AdminRoomDetailType,
    AdminUserType,
    CreateUserRequest,
    CreateUserResponse,
    JudgeUserType,
    ResponseDetailData,
    AdminTeamType,
} from "~/types/admin.types";
import { privateApi } from "~/utils/axiosInstance";

class AdminApi {
    static async getAllUsers() {
        const res = await privateApi.get<ResponseDetailData<AdminUserType[]>>("/admin/users");
        return res.data;
    }

    // static async getUserById(userId: string) {
    //     const res = await privateApi.get<ResponseDetailData<AdminUserDetailType>>(`/admin/users/${userId}`);
    //     return res.data;
    // }

    static async createUser(data: CreateUserRequest) {
        const res = await privateApi.post<ResponseDetailData<CreateUserResponse>>("/admin/users", data);
        return res.data;
    }

    static async addRoleToUser(userId: string, data: AddRoleRequest) {
        const res = await privateApi.post<ResponseDetailData<{ message: string }>>(
            `/admin/users/${userId}/roles`,
            data,
        );
        return res.data;
    }

    static async removeRoleFromUser(userId: string, roleId: number) {
        const res = await privateApi.delete<ResponseDetailData<{ message: string }>>(
            `/admin/users/${userId}/roles/${roleId}`,
        );
        return res.data;
    }

    static async getAllRooms() {
        const res = await privateApi.get<ResponseDetailData<AdminRoomType[]>>("/admin/rooms");
        return res.data;
    }

    static async getRoomDetail(roomId: string) {
        const res = await privateApi.get<ResponseDetailData<AdminRoomDetailType>>(`/admin/rooms/${roomId}`);
        return res.data;
    }

    static async addJudgeToRoom(roomId: string, data: AddJudgeToRoomRequest) {
        const res = await privateApi.post<ResponseDetailData<{ message: string; added: number }>>(
            `/admin/rooms/${roomId}/judges`,
            data,
        );
        return res.data;
    }

    static async removeJudgeFromRoom(judgeRoomId: string) {
        const res = await privateApi.delete<ResponseDetailData<{ message: string }>>(
            `/admin/rooms/judges/${judgeRoomId}`,
        );
        return res.data;
    }

    static async getJudgeUsers() {
        const res = await privateApi.get<ResponseDetailData<JudgeUserType[]>>("/admin/judges");
        return res.data;
    }

    static async getAllTeams() {
        const res = await privateApi.get<ResponseDetailData<AdminTeamType[]>>("/admin/teams");
        return res.data;
    }
}

export default AdminApi;
