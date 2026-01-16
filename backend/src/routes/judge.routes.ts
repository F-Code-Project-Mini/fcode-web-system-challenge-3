import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as judgeController from "~/controllers/judge.controllers";

const judgeRouter = Router();

judgeRouter.get("/rooms", auth, isRole([RoleType.JUDGE]), judgeController.getJudgeRooms);
// http://localhost:8000/api/v1/judge/rooms/1d5b0346-516f-4148-b546-b3f4be678851/teams
judgeRouter.get("/rooms/:roomId/teams", auth, isRole([RoleType.JUDGE]), judgeController.getTeamsByRoom);

judgeRouter.get("/barem/:candidateId", auth, isRole([RoleType.JUDGE]), judgeController.getBarem);

export default judgeRouter;
