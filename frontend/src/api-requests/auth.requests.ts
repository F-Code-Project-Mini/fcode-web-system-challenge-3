import type { LoginInput } from "~/types/user.types";
import { publicApi } from "~/utils/axiosInstance";

class AuthApi {
    static login = async ({ email, password }: LoginInput) => {
        const response = await publicApi.post("/auth/login", { email, password });
        return response.data;
    };
    static getInfo = async () => {
        const response = await publicApi.get("/get-info");
        return response.data;
    };
}
export default AuthApi;
