import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as mentorController from "~/controllers/mentor.controllers";

const mentorRouter = Router();
mentorRouter.get("/get-barem/:candidateId", auth, isRole([RoleType.MENTOR]), mentorController.getBarem);
// mentorRouter.patch("/candidate/:candidateId/note", auth, isRole([RoleType.MENTOR]), mentorController.updateNote);
export default mentorRouter;
