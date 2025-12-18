import { Router } from "express";
import { TokenType } from "~/constants/enums";
import * as authController from "~/controllers/users.controllers";
import * as middlewareAuth from "~/middlewares/auth.middlewares";

import { loginSchema } from "~/rules/auth/auth.schema";
import { validate } from "~/utils/validation";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/get-info", middlewareAuth.auth, authController.getInfo);
authRouter.post("/refresh", middlewareAuth.verifyToken(TokenType.RefreshToken), authController.refreshToken);

export default authRouter;
