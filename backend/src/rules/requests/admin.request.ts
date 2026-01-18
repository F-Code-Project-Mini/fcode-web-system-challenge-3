import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        email: z.string().email("Email không hợp lệ!"),
        fullName: z.string().min(1, "Họ tên không được để trống!"),
    }),
});

export const addRoleSchema = z.object({
    body: z.object({
        role: z.enum(["CANDIDATE", "HOST", "MENTOR", "JUDGE", "ADMIN"] as const, {
            message: "Role không hợp lệ!",
        }),
    }),
});

export const addJudgeToRoomSchema = z.object({
    body: z.object({
        judgeId: z.string().uuid("Judge ID không hợp lệ!"),
    }),
});
