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
        page: z.coerce.number().int().positive(),
        limit: z.coerce.number().int().positive(),
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
