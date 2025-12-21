import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import topicRouter from "./topic.routes";
import teamRouter from "./team.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/topics", topicRouter);
rootRouter.use("/teams", teamRouter);
export default rootRouter;
