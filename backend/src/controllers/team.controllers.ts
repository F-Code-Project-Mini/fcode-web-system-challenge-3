import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import teamService from "~/services/team.service";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number((req.query as any).page);
        const limit = Number((req.query as any).limit);
        return res.status(HTTP_STATUS.OK).json(
            new ResponseClient({
                result: await teamService.getAll({
                    page,
                    limit,
                    role: req.role,
                    userId: req.userId,
                }),
            }),
        );
    } catch (error) {
        return next(error);
    }
};

export const getDetail = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const result = await teamService.getDetail(req.params.id);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const getTeamByUserId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const result = await teamService.getTeamByUserId(req.params.id);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mentorship_id, topic_id } = req.body as {
            mentorship_id: string;
            topic_id: string;
        };
        const created = await teamService.create({ mentorship_id, topic_id });
        return res
            .status(HTTP_STATUS.CREATED)
            .json(new ResponseClient({ message: "Tạo team thành công!", result: { id: created.id } }));
    } catch (error) {
        return next(error);
    }
};

export const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { topic_id, mentorship_id } = req.body as {
            topic_id?: string;
            mentorship_id?: string;
        };
        const result = await teamService.update(id, { topic_id, mentorship_id });
        return res
            .status(HTTP_STATUS.OK)
            .json(new ResponseClient({ message: "Cập nhật team thành công!", result }));
    } catch (error) {
        return next(error);
    }
};

export const deleteTeam = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        await teamService.delete(req.params.id);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Xóa team thành công!" }));
    } catch (error) {
        return next(error);
    }
};

export const assignMember = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { candidate_id } = req.body as { candidate_id: string };
        await teamService.assignMember(req.params.id, candidate_id);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Thêm thành viên vào team thành công!" }));
    } catch (error) {
        return next(error);
    }
};

export const setLeader = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { candidate_id } = req.body as { candidate_id: string };
        await teamService.setLeader(req.params.id, candidate_id);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Cập nhật leader thành công!" }));
    } catch (error) {
        return next(error);
    }
};
