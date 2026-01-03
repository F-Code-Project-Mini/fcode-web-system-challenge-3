import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as mentorController from "~/controllers/mentor.controllers";

const mentorRouter = Router();
mentorRouter.get("/get-barem", auth, isRole([RoleType.MENTOR]), mentorController.getBarem);
export default mentorRouter;
