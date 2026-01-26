import { Router } from "express";
import { validate } from "~/utils/validation";
import { RoleType } from "~/constants/enums";
import * as teamController from "~/controllers/team.controllers";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import {
    changeNameSchema,
    // getAllSchema,
    idParamSchema,
    noteBodySchema,
    submissionSchema,
    uuidParamsAndBodySchema,
} from "~/rules/auth/auth.schema";
const teamRouter = Router();

// teamRouter.get("/", auth, isRole([RoleType.ADMIN, RoleType.MENTOR]), validate(getAllSchema), teamController.getAll);
teamRouter.get("/", auth, teamController.getAll);
teamRouter.post("/present", auth, teamController.createSchedulePresentation);

teamRouter.get("/:teamId/submissions", auth, teamController.getSubmissionInTeam);
teamRouter.post("/:teamId/submissions", auth, validate(submissionSchema), teamController.createSubmission);

// get các lịch đã có thể đăng ký
teamRouter.get("/get-schedule-all", auth, teamController.getSchedulePresentation);

teamRouter.get("/get-schedule/:teamId", auth, teamController.getSchedulePresentationInTeam);

teamRouter.get("/:id", auth, validate(idParamSchema), teamController.getDetail);

// http://localhost:8000/api/v1/teams/mentor/305a593b-4994-41bc-9207-eb8a49ef7eaa
teamRouter.get("/mentor/:id", auth, validate(idParamSchema), teamController.getTeamByUserId);

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
    // validate(noteBodySchema),
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
