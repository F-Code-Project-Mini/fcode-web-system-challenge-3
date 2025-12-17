import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { HTTP_STATUS } from "~/constants/httpStatus";
import topicRepository from "~/repositories/topic.repository";

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
