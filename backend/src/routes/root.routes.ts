import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import topicRouter from "./topic.routes";
import teamRouter from "./team.routes";
import mentorRouter from "./mentor.routes";
import judgeRouter from "./judge.routes";
import adminRouter from "./admin.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/topics", topicRouter);
rootRouter.use("/teams", teamRouter);
rootRouter.use("/mentor", mentorRouter);
rootRouter.use("/judge", judgeRouter);
rootRouter.use("/admin", adminRouter);
export default rootRouter;
