import { ExpiresInTokenType, TokenType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import userRespository from "~/repositories/user.repository";
import AlgoCrypoto from "~/utils/crypto";
import AlgoJwt from "~/utils/jwt";
import { LoginRequestBody } from "~/rules/requests/user.request";
import redisClient from "~/configs/redis";

class AuthService {
    public login = async (data: LoginRequestBody) => {
        const { email, password } = data;
        const accountExisted = await userRespository.findByEmail(email);
        if (!accountExisted || !(await AlgoCrypoto.verifyPassword(password, accountExisted.password))) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Thông tin đăng nhập của bạn không hợp lệ!",
            });
        }
        const token = await this.signAccesAndRefreshToken(accountExisted.id);
        return {
            ...token,
            user: accountExisted,
        };
    };

    public refreshToken = async (userId: string, token: string) => {
        const tokenInRedis = await redisClient.get(`refreshToken:${userId}`);
        console.log("refresh token in redis", tokenInRedis, userId);

        if (!tokenInRedis || tokenInRedis !== token) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Refresh token không được tìm thấy trong hệ thống hoặc không chính xác!",
            });
        }
        return await this.signAccesAndRefreshToken(userId);
    };

    public getInfo = async (userId: string) => {
        const user = await userRespository.findById(userId);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Người dùng không tồn tại trong hệ thống!",
            });
        }
        return user;
    };

    private signToken = ({
        userId,
        type,
        expiresIn = ExpiresInTokenType.AccessToken,
    }: {
        userId: string;
        type: TokenType;
        expiresIn?: number;
    }) => {
        return AlgoJwt.signToken({
            payload: { type, userId },
            options: { expiresIn: expiresIn }, // convert seconds to mili seconds
        }) as Promise<string>;
    };

    private signAccesAndRefreshToken = async (userId: string) => {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken({
                userId,
                type: TokenType.AccessToken,
                expiresIn: ExpiresInTokenType.AccessToken,
            }),
            this.signToken({
                userId,
                type: TokenType.RefreshToken,
                expiresIn: ExpiresInTokenType.RefreshToken,
            }),
        ]);

        // Lưu lại refresh token vào redis
        console.log("refreshToken", refreshToken);

        await redisClient.set(`refreshToken:${userId}`, refreshToken, ExpiresInTokenType.RefreshToken * 1000);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    };
}
const authService = new AuthService();
export default authService;
