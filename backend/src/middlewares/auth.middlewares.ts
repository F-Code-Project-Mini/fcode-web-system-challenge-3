import { NextFunction, Request, Response } from "express";
import redisClient from "~/configs/redis";
import { RoleType, TokenType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/rules/error";
import Helpers from "~/utils/helpers";
import AlgoJwt from "~/utils/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = Helpers.getTokenFromHeader(req);

    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "Vui lòng đăng nhập để tiếp tục!",
        });
    }

    try {
        const payload = await AlgoJwt.verifyToken({ token });
        if (payload.type !== TokenType.AccessToken) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Token của bạn không hợp lệ!",
            });
        }
        req.userId = payload.userId;
        req.roles = payload.roles;
        // console.log("payload", payload);

        if (payload.role) {
            req.roles = [payload.role];
        } else {
            req.roles = payload.roles;
        }

        next();
    } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn!",
        });
    }
};
export const verifyToken =
    (type: TokenType) => async (req: Request<{ token: string }>, res: Response, next: NextFunction) => {
        const token = req.cookies[`${type === TokenType.AccessToken ? "access" : "refresh"}_token`];
        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json(
                new ErrorWithStatus({
                    status: HTTP_STATUS.UNAUTHORIZED,
                    message: "Vui lòng đăng nhập để tiếp tục!",
                }),
            );
        }
        try {
            const payload = await AlgoJwt.verifyToken({ token });
            if (payload.type !== type) {
                throw new ErrorWithStatus({
                    status: HTTP_STATUS.UNAUTHORIZED,
                    message: "Token không chính xác!",
                });
            }
            req.userId = payload.userId;
            if (payload.role) {
                req.roles = [payload.role];
            } else {
                req.roles = payload.roles;
            }

            next();
        } catch (error) {
            next(error);
        }
    };

export const verifyTokenActiveAccount = async (req: Request<{ token: string }>, res: Response, next: NextFunction) => {
    const { token } = req.params;
    try {
        const payload = await AlgoJwt.verifyToken({ token });
        if (payload.type !== TokenType.ActivateAccount) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: "Token không chính xác!",
            });
        }
        req.userId = payload.userId;
        next();
    } catch (error) {
        next(error);
    }
};
export const isRole = (roles: RoleType[]) => async (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.roles || [];
    console.log("userRoles", userRoles);
    const hasPermission = roles.some((role) => userRoles.includes(role));

    if (hasPermission) {
        next();
    } else {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            message: "Bạn không có quyền để thao tác!",
        });
    }
};

export const isExsitedTokenInRedis = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const isExisted = await redisClient.exists(`activateAccountToken:${userId}`);
    if (!isExisted) {
        throw new ErrorWithStatus({
            status: HTTP_STATUS.BAD_REQUEST,
            message: "Token kích hoạt tài khoản không hợp lệ hoặc đã hết hạn!",
        });
    } else {
        req.userId = userId;
        next();
    }
};
