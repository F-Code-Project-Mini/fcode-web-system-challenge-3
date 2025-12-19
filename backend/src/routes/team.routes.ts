import { Router } from "express";
import { validate } from "~/utils/validation";
import { RoleType } from "~/constants/enums";
import * as teamController from "~/controllers/team.controllers";
import { auth, isRole, attachUserRole } from "~/middlewares/auth.middlewares";
import { getAllSchema, idParamSchema } from "~/rules/auth/auth.schema";

const teamRouter = Router();

teamRouter.get("/", auth, attachUserRole, isRole([RoleType.ADMIN, RoleType.MENTOR]), validate(getAllSchema), teamController.getAll);

teamRouter.get("/:id", auth, attachUserRole, validate(idParamSchema), teamController.getDetail);

teamRouter.get("/user/:id", auth, attachUserRole, validate(idParamSchema), teamController.getTeamByUserId);

teamRouter.post("/", auth, attachUserRole, isRole([RoleType.ADMIN]), teamController.create);
teamRouter.patch("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(idParamSchema), teamController.update);
teamRouter.delete("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(idParamSchema), teamController.deleteTeam);

teamRouter.patch("/:id/assign-member", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(idParamSchema), teamController.assignMember);
teamRouter.patch("/:id/set-leader", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(idParamSchema), teamController.setLeader);
export default teamRouter;
