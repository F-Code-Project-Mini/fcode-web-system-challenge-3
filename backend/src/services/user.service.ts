import { ExpiresInTokenType, RoleType, TokenType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import userRespository from "~/repositories/user.repository";
import AlgoCrypoto from "~/utils/crypto";
import AlgoJwt from "~/utils/jwt";
import { LoginRequestBody } from "~/rules/requests/user.request";
import redisClient from "~/configs/redis";
class AuthService {
    public activeAccount = async (data: LoginRequestBody) => {
        const { email, password = "" } = data;

        const user = await userRespository.findByEmail(email);

        if (user?.password) {
            return await this.login({ email, password });
        } else if (user) {
            await this.sendMailActiveAccount({ email, fullName: user.fullName, userId: user.id });
        }
        return true;
    };
    public login = async (data: LoginRequestBody) => {
        const { email, password } = data;
        const accountExisted = await userRespository.findByEmail(email);
        if (!accountExisted || !(await AlgoCrypoto.verifyPassword(password!, accountExisted.password))) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Thông tin đăng nhập của bạn không hợp lệ!",
            });
        }

        const token = await this.signAccesAndRefreshToken(accountExisted.id, accountExisted.role as RoleType);
        return {
            ...token,
            user: accountExisted,
        };
    };

    public sendMailActiveAccount = async ({
        email,
        fullName,
        userId,
    }: {
        email: string;
        fullName: string;
        userId: string;
    }) => {
        console.log("sendMailActiveAccount", email, fullName, userId);
        const token = await this.signToken({
            type: TokenType.ActivateAccount,

            userId,
            expiresIn: ExpiresInTokenType.ActivateAccount,
        });
        const KEY_ACTIVE = `activateAccountToken:${userId}`;
        const KEY_COUNTER = `activateAccountCounter:${userId}`;

        console.log("token ne", token);

        const currentCount = await redisClient.get(KEY_COUNTER);
        if (currentCount && parseInt(currentCount) >= 5) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Bạn đã gửi yêu cầu kích hoạt tài khoản quá nhiều lần, vui lòng thử lại sau!",
                isFirstLogin: true,
            });
        }
        await Promise.all([
            redisClient.incr(KEY_COUNTER),
            redisClient.expire(KEY_COUNTER, 60 * 60),
            redisClient.set(KEY_ACTIVE, token, ExpiresInTokenType.ActivateAccount),
        ]); // 60 phút

        // if (process.env.NODE_ENV === "production") {
        //     await addEmailJob({
        //         to: email,
        //         subject: `[F-Code] Kích hoạt tài khoản`,
        //         template: "activate_account",
        //         context: {
        //             name: fullName,
        //             activationLink: `${process.env.CLIENT_URL}/activate/token/${token}`,
        //         },
        //     });
        // } else {
        //     await addEmailJob({
        //         to: process.env.DEV_EMAIL_RECEIVER || email,
        //         subject: `[F-Code] Kích hoạt tài khoản`,
        //         template: "activate_account",
        //         context: {
        //             name: fullName,
        //             activationLink: `${process.env.CLIENT_URL}/activate/token/${token}`,
        //         },
        //     });
        // }
        return true;
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
    setPassword = async (userId: string, password: string) => {
        const hashedPassword = await AlgoCrypoto.hashPassword(password);
        await Promise.all([
            userRespository.updatePassword(userId, hashedPassword),
            redisClient.del(`activateAccountToken:${userId}`),
        ]);
        return true;
    };

    private signToken = ({
        userId,
        role,
        type,
        expiresIn = ExpiresInTokenType.AccessToken,
    }: {
        userId: string;
        role?: RoleType;
        type: TokenType;
        expiresIn?: number;
    }) => {
        return AlgoJwt.signToken({
            payload: { type, userId, role },
            options: { expiresIn: expiresIn }, // convert seconds to mili seconds
        }) as Promise<string>;
    };

    private signAccesAndRefreshToken = async (userId: string, role?: RoleType) => {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken({
                userId,
                role,
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
