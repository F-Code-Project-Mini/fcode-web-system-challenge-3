import { Router } from "express";
import adminController from "~/controllers/admin.controllers";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import { RoleType } from "~/constants/enums";

const adminRouter = Router();

adminRouter.get("/users", auth, isRole([RoleType.ADMIN]), adminController.getAllUsers);
adminRouter.get("/users/:id", auth, isRole([RoleType.ADMIN]), adminController.getUserById);
adminRouter.post("/users", auth, isRole([RoleType.ADMIN]), adminController.createUser);
adminRouter.post("/users/:id/roles", auth, isRole([RoleType.ADMIN]), adminController.addRoleToUser);
adminRouter.delete("/users/:id/roles/:roleId", auth, isRole([RoleType.ADMIN]), adminController.removeRoleFromUser);
// adminRouter.patch("/approve/:candidateId", auth, isRole([RoleType.ADMIN]), adminController.approveCandidate);

adminRouter.get("/rooms", auth, isRole([RoleType.ADMIN]), adminController.getAllRooms);
adminRouter.get("/rooms/:id", auth, isRole([RoleType.ADMIN]), adminController.getRoomDetail);
adminRouter.post("/rooms/:roomId/judges", auth, isRole([RoleType.ADMIN]), adminController.addJudgeToRoom);
adminRouter.delete("/rooms/judges/:judgeRoomId", auth, isRole([RoleType.ADMIN]), adminController.removeJudgeFromRoom);
adminRouter.get("/judges", auth, isRole([RoleType.ADMIN]), adminController.getJudgeUsers);
adminRouter.get("/teams", auth, isRole([RoleType.ADMIN]), adminController.getAllTeams);

export default adminRouter;
