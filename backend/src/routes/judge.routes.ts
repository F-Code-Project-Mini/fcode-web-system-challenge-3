import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as judgeController from "~/controllers/judge.controllers";

const judgeRouter = Router();

// Get all rooms that judge is assigned to
judgeRouter.get("/rooms", auth, isRole([RoleType.JUDGE]), judgeController.getJudgeRooms);

// Get teams in a specific room
judgeRouter.get("/rooms/:roomId/teams", auth, isRole([RoleType.JUDGE]), judgeController.getTeamsByRoom);

export default judgeRouter;
