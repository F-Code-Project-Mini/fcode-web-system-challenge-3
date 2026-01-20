import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as judgeController from "~/controllers/judge.controllers";

const judgeRouter = Router();

judgeRouter.get("/rooms", auth, isRole([RoleType.JUDGE]), judgeController.getJudgeRooms);
// http://localhost:8000/api/v1/judge/get-barem/17e2f31d-c9a5-4116-a8ef-acd52c0366ad
judgeRouter.get("/rooms/:roomId/teams", auth, isRole([RoleType.JUDGE]), judgeController.getTeamsByRoom);

// mentorRouter.get("/get-barem/:candidateId", auth, isRole([RoleType.MENTOR]), mentorController.getBarem);
judgeRouter.get("/get-barem/:candidateId", auth, isRole([RoleType.JUDGE]), judgeController.getBarem);

export default judgeRouter;
