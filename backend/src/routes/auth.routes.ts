import { Router } from "express";
import { TokenType } from "~/constants/enums";
import * as authController from "~/controllers/user.controllers";
import * as middlewareAuth from "~/middlewares/auth.middlewares";

import { activeAccountSchema, loginSchema, setPasswordSchema } from "~/rules/auth/auth.schema";
import { validate } from "~/utils/validation";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/get-info", middlewareAuth.auth, authController.getInfo);
authRouter.get(
    "/active/token/:token",
    validate(activeAccountSchema),
    middlewareAuth.verifyTokenActiveAccount,
    middlewareAuth.isExsitedTokenInRedis,
    authController.getInfo,
);
authRouter.post(
    "/set-password/token/:token",
    validate(activeAccountSchema),
    validate(setPasswordSchema),
    middlewareAuth.verifyTokenActiveAccount,
    middlewareAuth.isExsitedTokenInRedis,
    authController.setPassword,
);
authRouter.post("/refresh", middlewareAuth.verifyToken(TokenType.RefreshToken), authController.refreshToken);

export default authRouter;
