import { Router } from "express";
import { RoleType } from "~/constants/enums";
import * as topicController from "~/controllers/topic.controllers";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import { attachUserRole } from "~/middlewares/topic.middlewares";

const topicRouter = Router();

topicRouter.get("/", auth, attachUserRole, isRole([RoleType.ADMIN]), topicController.getAll);
topicRouter.get("/:id", auth, attachUserRole, topicController.getDetail);
topicRouter.post("/", auth, attachUserRole, isRole([RoleType.ADMIN]), topicController.create);

export default topicRouter;
