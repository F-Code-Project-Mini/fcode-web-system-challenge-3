import { Router } from "express";
import { RoleType } from "~/constants/enums";
import * as topicController from "~/controllers/topic.controllers";
import { auth, isRole, attachUserRole } from "~/middlewares/auth.middlewares";
import { getAllSchema, idParamSchema, topicSchema } from "~/rules/auth/auth.schema";
import { validate } from "~/utils/validation";


const topicRouter = Router();

topicRouter.get("/", auth, attachUserRole, validate(getAllSchema), topicController.getAll);
topicRouter.get("/:id", auth, attachUserRole, validate(idParamSchema), topicController.getDetail);

topicRouter.post("/", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(topicSchema), topicController.create);
topicRouter.patch("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(idParamSchema), topicController.update);
topicRouter.delete("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), validate(idParamSchema), topicController.deleteTopic);
export default topicRouter;
