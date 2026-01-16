import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
import judgeService from "~/services/judge.service";

export const getJudgeRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!;
        const result = await judgeService.getJudgeRooms(userId);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};

export const getTeamsByRoom = async (req: Request<{ roomId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId!;
        const { roomId } = req.params;
        const result = await judgeService.getTeamsByRoom(userId, roomId);
        return res.status(HTTP_STATUS.OK).json(new ResponseClient({ result }));
    } catch (error) {
        return next(error);
    }
};
