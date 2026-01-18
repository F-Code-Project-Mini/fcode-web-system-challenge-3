import { Request, Response, NextFunction } from "express";
import adminService from "~/services/admin.service";
import { HTTP_STATUS } from "~/constants/httpStatus";

class AdminController {
    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await adminService.getAllUsers();
            res.status(HTTP_STATUS.OK).json({
                message: "Lấy danh sách users thành công!",
                result: users,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await adminService.getUserById(id);
            res.status(HTTP_STATUS.OK).json({
                message: "Lấy thông tin user thành công!",
                result: user,
            });
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, fullName } = req.body;
            const user = await adminService.createUser(email, fullName);
            res.status(HTTP_STATUS.CREATED).json({
                message: "Tạo user thành công!",
                result: user,
            });
        } catch (error) {
            next(error);
        }
    };

    public addRoleToUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const result = await adminService.addRoleToUser(id, role);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };

    public removeRoleFromUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, roleId } = req.params;
            const result = await adminService.removeRoleFromUser(id, parseInt(roleId));
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rooms = await adminService.getAllRooms();
            res.status(HTTP_STATUS.OK).json({
                message: "Lấy danh sách rooms thành công!",
                result: rooms,
            });
        } catch (error) {
            next(error);
        }
    };

    public addJudgeToRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { roomId } = req.params;
            const { judgeId } = req.body;
            const result = await adminService.addJudgeToRoom(judgeId, roomId);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };

    public removeJudgeFromRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { judgeRoomId } = req.params;
            const result = await adminService.removeJudgeFromRoom(judgeRoomId);
            res.status(HTTP_STATUS.OK).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getJudgeUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const judges = await adminService.getJudgeUsers();
            res.status(HTTP_STATUS.OK).json({
                message: "Lấy danh sách judges thành công!",
                result: judges,
            });
        } catch (error) {
            next(error);
        }
    };
}

const adminController = new AdminController();
export default adminController;
