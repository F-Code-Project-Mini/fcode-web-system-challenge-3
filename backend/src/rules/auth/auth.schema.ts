import { refine } from "zod";
import z from "zod/v3";
const jwtSchema = z.string().regex(/^[^.]+\.[^.]+\.[^.]+$/, "Token không hợp lệ!");
export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email().nonempty(),
        password: z.string().nullable(),
    }),
});
export const activeAccountSchema = z.object({
    params: z.object({
        token: jwtSchema,
    }),
});
export const setPasswordSchema = z.object({
    body: z
        .object({
            password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
            confirmPassword: z.string().min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự!"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Nhập lại mật khẩu không khớp!",
            path: ["confirmPassword"],
        }),
});
