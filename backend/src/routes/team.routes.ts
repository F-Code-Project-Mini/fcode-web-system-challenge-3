import { Router } from "express";
import { validate } from "~/utils/validation";
import { RoleType } from "~/constants/enums";
import * as teamController from "~/controllers/team.controllers";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import {
    changeNameSchema,
    getAllSchema,
    idParamSchema,
    noteBodySchema,
    uuidParamsAndBodySchema,
} from "~/rules/auth/auth.schema";
const teamRouter = Router();

// teamRouter.get("/", auth, isRole([RoleType.ADMIN, RoleType.MENTOR]), validate(getAllSchema), teamController.getAll);
teamRouter.get("/", auth, validate(getAllSchema), teamController.getAll);

teamRouter.get("/:id", auth, validate(idParamSchema), teamController.getDetail);

teamRouter.get("/mentor/:id", auth, validate(idParamSchema), teamController.getTeamByUserId);

// teamRouter.post("/", auth, isRole([RoleType.ADMIN]), teamController.create);
teamRouter.patch(
    "/:id/change-name",
    auth,
    isRole([RoleType.CANDIDATE]),
    validate(idParamSchema),
    validate(changeNameSchema),
    teamController.changeName,
);
teamRouter.patch(
    "/:id",
    auth,
    isRole([RoleType.MENTOR]),
    validate(idParamSchema),
    validate(noteBodySchema),
    teamController.update,
);
teamRouter.delete("/:id", auth, isRole([RoleType.ADMIN]), validate(idParamSchema), teamController.deleteTeam);

teamRouter.patch(
    "/:id/assign-member",
    auth,
    isRole([RoleType.ADMIN]),
    validate(uuidParamsAndBodySchema),
    teamController.assignMember,
);
teamRouter.patch(
    "/:id/set-leader",
    auth,
    isRole([RoleType.MENTOR]),
    validate(uuidParamsAndBodySchema),
    teamController.setLeader,
);
teamRouter.get(
    "/get-teams-by-mentor",
    auth,
    isRole([RoleType.MENTOR]),
    // validate(uuidParamsAndBodySchema),
    teamController.getTeamsByMentor,
);
export default teamRouter;
