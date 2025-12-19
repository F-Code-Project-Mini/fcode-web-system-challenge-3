import z from "zod/v3";
const jwtSchema = z.string().regex(/^[^.]+\.[^.]+\.[^.]+$/, "Token không hợp lệ!");
export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email().nonempty(),
        password: z.string().nullable(),
    }),
});
