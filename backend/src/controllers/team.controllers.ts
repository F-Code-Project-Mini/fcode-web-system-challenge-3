import { NextFunction, Request, Response } from "express";
import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import teamService from "~/services/team.service";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number((req.query as any).page) ?? 1;
        const limit = Number((req.query as any).limit) ?? 20;
        const result = await teamService.getAll({
            page,
            limit,
            role: req.role,
            userId: req.userId,
        });
        return res.status(HTTP_STATUS.OK).json(
            new ResponseClient({
                result,
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
    const {
        role,
        params: { id },
    } = req;
    try {
        const result = await teamService.getTeamByUserId(id, role == RoleType.MENTOR);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

// export const create = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { mentorship_id, topic_id } = req.body as {
//             mentorship_id: string;
//             topic_id: string;
//         };
//         const created = await teamService.create({ mentorship_id, topic_id });
//         return res
//             .status(HTTP_STATUS.CREATED)
//             .json(new ResponseClient({ message: "Tạo team thành công!", result: { id: created.id } }));
//     } catch (error) {
//         return next(error);
//     }
// };

export const update = async (
    req: Request<{ id: string }, any, { note: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const result = await teamService.update(id, { note });
        return res
            .status(HTTP_STATUS.OK)
            .json(new ResponseClient({ message: "Cập nhật thông tin thành công!", result }));
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
export const getTeamsByMentor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.userId", req.userId);
    const { userId } = req;
    try {
        await teamService.getTeamByUserId(userId!);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Lấy danh sách thành viên thành công!" }));
    } catch (error) {
        return next(error);
    }
};
export const changeName = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    console.log("req.body", "Đã ghi nhanan n");
    const { name } = req.body;
    const { userId } = req;
    try {
        const result = await teamService.changeName(userId!, req.params.id, name);
        return res
            .status(HTTP_STATUS.OK)
            .json(new ResponseClient({ message: "Cập nhật tên nhóm thành công!", result }));
    } catch (error) {
        return next(error);
    }
};
