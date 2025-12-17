import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { RoleType } from "~/constants/enums";
import userRepository from "~/repositories/user.repository";

export const attachUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: false,
                message: "Vui lòng đăng nhập trước khi thao tác.",
            });
        }

        const user = await userRepository.findById(req.userId);
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: false,
            message: "Tài khoản không tồn tại hoặc đã bị xoá.",
        });
        }

        // Role từ Prisma enum trùng giá trị string với RoleType, cast để khớp type trong req.
        req.role = user.role as unknown as RoleType;
        req.candidateId = user.candidateId ?? undefined;
        return next();
    } catch (error) {
        return next(error);
    }
};
