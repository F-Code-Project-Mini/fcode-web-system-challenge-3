import { refine } from "zod";
import z from "zod/v3";
const jwtSchema = z.string().regex(/^[^.]+\.[^.]+\.[^.]+$/, "Token không hợp lệ!");
export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email().nonempty(),
        password: z.string().trim(),
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
        id: z.string().uuid("ID không hợp lệ!"),
    }),
});

export const uuidParamsAndBodySchema = z.object({
    ...idParamSchema.shape,
    body: z.object({
        candidate_id: z.string().uuid("ID ứng viên không hợp lệ!"),
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
export const changeNameSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .nonempty("Tên nhóm không được để trống!")
            .min(3, "Tên nhóm phải có ít nhất 3 ký tự!")
            .max(50, "Tên nhóm không được vượt quá 50 ký tự!"),
    }),
});

export const noteBodySchema = z.object({
    body: z.object({
        note: z.string().trim().nonempty("Ghi chú không được để trống!"),
    }),
});

export const submissionSchema = z.object({
    body: z.object({
        slideLink: z.string().trim().url("Link slide không hợp lệ!"),
        taskAssignmentLink: z.string().trim().url("Link bài tập không hợp lệ!"),
        productLinks: z.array(z.string().trim().url("Link sản phẩm không hợp lệ!")),
        note: z.string().trim().optional(),
    }),
});
