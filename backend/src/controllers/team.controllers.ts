import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import teamRepository from "~/repositories/team.repository";
import { isUuidV4 } from "~/utils/validation";

interface TeamQuery {
    page?: string;
    limit?: string;
}

// GET ALL
export const getAll = async (
    req: Request<ParamsDictionary, any, any, TeamQuery>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Giá trị page/limit phải là số nguyên >= 1.",
            });
        }

        const isMentor = req.role === RoleType.MENTOR;
        const mentorId = isMentor ? req.userId : undefined;

        const { teams, meta } = await teamRepository.findWithPagination({
            page,
            limit,
            mentorId,
        });

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            data: teams.map((team) => ({
                id: team.id,
                mentorship_id: team.mentorshipId,
                leader_id: team.leaderId,
                topic_id: team.topicId,
                mentor_note: team.mentorNote
            })),                                                                                                                       
            pagination: {
                total: meta.total,
                page: meta.page,
                limit: meta.limit,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// GET DETAIL
export const getDetail = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isUuidV4(id)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id team không hợp lệ.",
            });
        }

        const team = await teamRepository.findByIdWithMembers(id);
        if (!team) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Team không tồn tại.",
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            data: team,
        });
    } catch (error) {
        return next(error);
    }
};

// GET team by user id (candidate or mentor)
export const getTeamByUserId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isUuidV4(id)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id không hợp lệ.",
            });
        }

        const team = await teamRepository.findByUserId(id);
        if (!team) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Không tìm thấy team tương ứng.",
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            data: team,
        });
    } catch (error) {
        return next(error);
    }
};

// CREATE
export const create = async (
    req: Request<ParamsDictionary, any, { mentorship_id?: string; topic_id?: string; mentor_note?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const mentorshipId = req.body.mentorship_id?.trim();
        const topicId = req.body.topic_id?.trim();
        const mentorNote = req.body.mentor_note?.trim() ?? null;

        if (!mentorshipId || !topicId || !isUuidV4(mentorshipId) || !isUuidV4(topicId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Dữ liệu nhập vào không hợp lệ.",
            });
        }

        const team = await teamRepository.create({
            mentorshipId,
            topicId,
            mentorNote,
        });

        return res.status(HTTP_STATUS.CREATED).json({
            status: true,
            message: "Đã tạo team thành công!",
            data: { id: team.id },
        });
    } catch (error) {
        return next(error);
    }
};

// UPDATE
export const update = async (
    req: Request<{ id: string }, any, { topic_id?: string; mentor_note?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const topicId = req.body.topic_id?.trim();
        const mentorNote = req.body.mentor_note?.trim() ?? null;

        if (!isUuidV4(id)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id team không hợp lệ.",
            });
        }

        if (!topicId || !isUuidV4(topicId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Dữ liệu nhập vào không hợp lệ.",
            });
        }

        const existed = await teamRepository.findById(id);
        if (!existed) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Team không tồn tại.",
            });
        }

        const updated = await teamRepository.update(id, {
            topicId,
            mentorNote,
        });

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Cập nhật team thành công!",
            data: updated,
        });
    } catch (error) {
        return next(error);
    }
};

// DELETE
export const deleteTeam = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isUuidV4(id)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id team không hợp lệ.",
            });
        }

        const existed = await teamRepository.findById(id);
        if (!existed) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Team không tồn tại.",
            });
        }

        await teamRepository.deleteById(id);
        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Xóa team thành công!",
        });
    } catch (error) {
        return next(error);
    }
};

// ASSIGN
export const assignMember = async (
    req: Request<{ id: string }, any, { candidate_id?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const candidateId = req.body.candidate_id?.trim();

        if (!isUuidV4(id) || !candidateId || !isUuidV4(candidateId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Dữ liệu nhập vào không hợp lệ.",
            });
        }

        const result = await teamRepository.assignMember(id, candidateId);

        if (!result.ok) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: result.message,
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Đã thêm thành viên vào team!",
        });
    } catch (error) {
        return next(error);
    }
};

// SET
export const setLeader = async (
    req: Request<{ id: string }, any, { candidate_id?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const candidateId = req.body.candidate_id?.trim();

        if (!isUuidV4(id) || !candidateId || !isUuidV4(candidateId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Dữ liệu nhập vào không hợp lệ.",
            });
        }

        const result = await teamRepository.setLeader(id, candidateId);
        if (!result.ok) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: result.message,
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Cập nhật leader thành công!",
        });
    } catch (error) {
        return next(error);
    }
};
