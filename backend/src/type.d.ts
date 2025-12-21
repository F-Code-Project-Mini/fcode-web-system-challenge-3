import User from "./schemas/user.schema";
import { TokenPayload } from "./rules/requests/User.requests";
import { RoleType } from "./constants/enums";

declare module "express" {
    interface Request {
        userId?: string;
        role?: RoleType;
        tokenPayload?: TokenPayload;
        candidateId?: string;
    }
}
