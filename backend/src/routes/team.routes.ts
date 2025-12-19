import { Router } from "express";
import { RoleType } from "~/constants/enums";
import * as teamController from "~/controllers/team.controllers";
import { auth, isRole, attachUserRole } from "~/middlewares/auth.middlewares";

const teamRouter = Router();

teamRouter.get("/", auth, attachUserRole, isRole([RoleType.ADMIN, RoleType.MENTOR]), teamController.getAll);

teamRouter.get("/:id", auth, attachUserRole, teamController.getDetail);

teamRouter.get("/user/:id", auth, attachUserRole, teamController.getTeamByUserId);

teamRouter.post("/", auth, attachUserRole, isRole([RoleType.ADMIN]), teamController.create);
teamRouter.patch("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), teamController.update);
teamRouter.delete("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), teamController.deleteTeam);

teamRouter.patch("/:id/assign-member", auth, attachUserRole, isRole([RoleType.ADMIN]), teamController.assignMember);
teamRouter.patch("/:id/set-leader", auth, attachUserRole, isRole([RoleType.ADMIN]), teamController.setLeader);

export default teamRouter;
