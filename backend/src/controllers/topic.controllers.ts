import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { RoleType } from "~/constants/enums";
import topicRepository from "~/repositories/topic.repository";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

interface TopicQuery {
    page?: string;
    limit?: string;
}

// GET ALL
export const getAll = async (
    req: Request<ParamsDictionary, any, any, TopicQuery>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        if (Number.isNaN(page) || Number.isNaN(limit) || page < 1 || limit < 1) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Giá trị page/limit phải là số nguyên >= 1.",
            });
        }

        const { topics, total } = await topicRepository.findWithPagination({ page, limit });

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            data: topics.map((topic) => ({
                id: topic.id,
                title: topic.title,
                file_path: topic.filePath,
                created_at: topic.createdAt,
                updated_at: topic.updatedAt,
            })),
            pagination: {
                total,
                page,
                limit,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// GET DETAIL
export const getDetail = async (
    req: Request<{ id: string }, any, any, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;

        const isUuidV4 = uuidValidate(id) && uuidVersion(id) === 4;
        if (!isUuidV4) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id topic không hợp lệ.",
            });
        }

        const topic = await topicRepository.findById(id);
        if (!topic) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        // Candidate chỉ xem được topic của team mình
        if (req.role === RoleType.CANDIDATE) {
            if (!req.candidateId) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: false,
                    message: "Topic này không tồn tại trên hệ thống.",
                });
            }

            const canView = await topicRepository.candidateHasTopic({
                topicId: id,
                candidateId: req.candidateId,
            });

            if (!canView) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: false,
                    message: "Topic này không tồn tại trên hệ thống.",
                });
            }
        }

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Lấy thông tin đề tài thành công!",
            data: {
                id: topic.id,
                title: topic.title,
                file_path: topic.filePath,
                created_at: topic.createdAt,
                updated_at: topic.updatedAt,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// CREATE
export const create = async (
    req: Request<ParamsDictionary, any, { title?: string; file_path?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { title, file_path } = req.body;

        // validate
        if (!title || !file_path) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Các trường không được để trống.",
            });
        }

        try {
            new URL(file_path);
        } catch {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Đường dẫn file không hợp lệ.",
            });
        }

        await topicRepository.create({
            title: title.trim(),
            filePath: file_path.trim(),
        });

        return res.status(HTTP_STATUS.CREATED).json({
            status: true,
            message: "Đã thêm đề tài thành công!",
        });
    } catch (error) {
        return next(error);
    }
};
