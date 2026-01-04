import { Request } from "express";
import { TokenType } from "~/constants/enums";
import { TokenPayload } from "~/rules/requests/user.request";

export default class Helpers {
    // kiểm tra token là access hay refresh
    static isTypeToken = (payload: TokenPayload, type: TokenType = TokenType.AccessToken) => {
        return payload.type === type;
    };

    // chuyển chữ cái đầu thành hoa
    static converFirstUpper = (val: string): string => {
        return val.charAt(0).toUpperCase() + val.slice(1).toLocaleLowerCase();
    };

    static getTokenFromHeader = (req: Request): string | null => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            return authHeader.slice(7, authHeader.length);
        }
        return null;
    };
}
