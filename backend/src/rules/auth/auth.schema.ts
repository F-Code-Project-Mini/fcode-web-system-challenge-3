import { refine } from "zod";
import z from "zod/v3";
const jwtSchema = z.string().regex(/^[^.]+\.[^.]+\.[^.]+$/, "Token không hợp lệ!");
export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email().nonempty(),
        password: z.string().trim().nonempty(),
    }),
});

export const getAllSchema = z.object({
    query: z.object({
        page: z.number().positive().default(1),
        limit: z.number().positive().default(20),
    }),
});

export const idParamSchema = z.object({
    params: z.object({
        id: z.string().uuid(""),
    }),
});

export const topicSchema = z.object({
    body: z.object({
        title: z.string().trim().nonempty(),
        file_path: z.string().trim().url(),
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
            password: z
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự!")
                .max(32, "Mật khẩu không được vượt quá 32 ký tự!")
                .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Mật khẩu phải bao gồm chữ cái và số!"),
            confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu!"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Nhập lại mật khẩu không khớp!",
            path: ["confirmPassword"],
        }),
});
