import { Router } from "express";
import { RoleType } from "~/constants/enums";
import * as topicController from "~/controllers/topic.controllers";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import { getAllSchema, idParamSchema, topicSchema } from "~/rules/auth/auth.schema";
import { validate } from "~/utils/validation";

const topicRouter = Router();

topicRouter.get("/", auth, validate(getAllSchema), topicController.getAll);
topicRouter.get("/:id", auth, validate(idParamSchema), topicController.getDetail);

topicRouter.post("/", auth, isRole([RoleType.ADMIN]), validate(topicSchema), topicController.create);
topicRouter.patch("/:id", auth, isRole([RoleType.ADMIN]), validate(idParamSchema), topicController.update);
topicRouter.delete("/:id", auth, isRole([RoleType.ADMIN]), validate(idParamSchema), topicController.deleteTopic);
export default topicRouter;
