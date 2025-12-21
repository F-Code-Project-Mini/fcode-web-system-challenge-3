import { NextFunction, ParamsDictionary } from "express-serve-static-core";
import { CookieOptions, Request, Response } from "express";
import { LoginRequestBody, UpdatePasswordRequestBody } from "~/rules/requests/user.request";
import userService from "~/services/user.service";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import { ExpiresInTokenType, RoleType } from "~/constants/enums";

export const login = async (
    req: Request<ParamsDictionary, any, LoginRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = await userService.activeAccount(req.body);
        if (data === true) {
            return res.status(HTTP_STATUS.OK).json(
                new ResponseClient({
                    message: "Nếu email của bạn đã được đăng ký, vui lòng kiểm tra hộp thư đến để kích hoạt tài khoản!",
                    isFirstLogin: true,
                }),
            );
        } else {
            const { access_token, refresh_token, user } = data!;
            setCookieResponse(res, "access_token", access_token, ExpiresInTokenType.AccessToken);
            setCookieResponse(res, "refresh_token", refresh_token, ExpiresInTokenType.RefreshToken);
            return res.status(HTTP_STATUS.OK).json(
                new ResponseClient({
                    message: "Đăng nhập thành công!",
                    result: user,
                }),
            );
        }
    } catch (error) {
        return next(error);
    }
};
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(HTTP_STATUS.OK).json(
            new ResponseClient({
                message: "Đăng xuất thành công!",
            }),
        );
    } catch (error) {
        return next(error);
    }
};
export const getInfo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    try {
        const result = await userService.getInfo(userId);
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Lấy thông tin người dùng thành công!",
            result,
        });
    } catch (error) {
        return next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refresh_token ?? "";
    const { userId, role } = req;

    try {
        const result = await userService.refreshToken(userId!, role!, token);
        setCookieResponse(res, "access_token", result.access_token, ExpiresInTokenType.AccessToken);
        setCookieResponse(res, "refresh_token", result.refresh_token, ExpiresInTokenType.RefreshToken);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Làm mới token thành công!" }));
    } catch (error) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return next(error);
    }
};
export const setPassword = async (
    req: Request<{ token: string }, any, UpdatePasswordRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    console.log("VÔ đây nè anh em nhe");

    const { userId } = req;
    const { password } = req.body;
    try {
        await userService.setPassword(userId!, password);
        return res.status(HTTP_STATUS.OK).json(
            new ResponseClient({
                message: "Đặt lại mật khẩu thành công!",
            }),
        );
    } catch (error) {
        return next(error);
    }
};

const setCookieResponse = (res: Response, name: string, token: string, expiresIn: number) => {
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + expiresIn * 1000),
        sameSite: "lax",
    };
    res.cookie(name, token, cookieOptions);
};
