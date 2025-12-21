import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import topicService from "~/services/topic.service";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number((req.query as any).page) ?? 1;
        const limit = Number((req.query as any).limit) ?? 10;
        const result = await topicService.getAll({ page, limit });
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
        const { id } = req.params;
        const result = await topicService.getDetail({
            id,
            role: req.role,
            candidateId: req.candidateId,
        });
        return res
            .status(HTTP_STATUS.OK)
            .json(new ResponseClient({ message: "Lấy thông tin đề tài thành công!", result }));
    } catch (error) {
        return next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await topicService.create(req.body as { title: string; file_path: string });
        return res.status(HTTP_STATUS.CREATED).json(new ResponseClient({ message: "Đã thêm đề tài thành công!" }));
    } catch (error) {
        return next(error);
    }
};

export const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const result = await topicService.update(req.params.id, req.body as { title: string; file_path: string });
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Cập nhật chủ đề thành công!", result }));
    } catch (error) {
        return next(error);
    }
};

export const deleteTopic = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        await topicService.delete(req.params.id);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ message: "Đã xóa đề tài thành công!" }));
    } catch (error) {
        return next(error);
    }
};
