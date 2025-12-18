import type { LoginInput, UserType } from "~/types/user.types";
import { privateApi, publicApi } from "~/utils/axiosInstance";

class AuthApi {
    static login = async ({ email, password }: LoginInput) => {
        const response = await privateApi.post<{ result: UserType }>("/auth/login", { email, password });
        return response.data.result;
    };
    static refreshToken = async () => {
        const response = await publicApi.post<{ status: boolean }>(
            "/auth/refresh",
            {},
            {
                withCredentials: true,
            },
        );
        return response.data;
    };
    static logout = async () => {
        const response = await privateApi.post("/auth/logout", {});
        return response.data;
    };
    static getInfo = async () => {
        const response = await privateApi.get<{ result: UserType }>("/auth/get-info");
        return response.data.result;
    };
}
export default AuthApi;
