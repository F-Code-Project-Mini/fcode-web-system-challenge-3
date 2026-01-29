import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as judgeController from "~/controllers/judge.controllers";
import { validate } from "~/utils/validation";
import { idParamSchema, noteBodySchema } from "~/rules/auth/auth.schema";
const judgeRouter = Router();

judgeRouter.get("/rooms", auth, isRole([RoleType.JUDGE]), judgeController.getJudgeRooms);
judgeRouter.get("/info/:judgeId", auth, isRole([RoleType.JUDGE]), judgeController.getJudgeInfo);

// http://localhost:8000/api/v1/judge/get-barem/17e2f31d-c9a5-4116-a8ef-acd52c0366ad
judgeRouter.get("/rooms/:roomId", auth, isRole([RoleType.JUDGE]), judgeController.getDetailRoom);
judgeRouter.get("/rooms/:roomId/:judgeId/teams", auth, isRole([RoleType.JUDGE]), judgeController.getTeamsByRoom);
judgeRouter.patch(
    "/teams/:id",
    auth,
    isRole([RoleType.JUDGE]),
    validate(idParamSchema),
    // validate(noteBodySchema),
    judgeController.updateNote,
);
// mentorRouter.get("/get-barem/:candidateId", auth, isRole([RoleType.MENTOR]), mentorController.getBarem);
judgeRouter.get("/get-barem/:candidateId/team", auth, isRole([RoleType.JUDGE]), judgeController.getBaremTeam);
judgeRouter.get("/get-barem/:candidateId/:roomId/:judgeId", auth, isRole([RoleType.JUDGE]), judgeController.getBarem);

export default judgeRouter;
