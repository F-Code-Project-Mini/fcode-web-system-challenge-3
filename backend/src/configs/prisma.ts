import { PrismaClient } from "@prisma/client";

const basePrisma = new PrismaClient({
    // log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

const prisma = basePrisma.$extends({
    query: {
        user: {
            async $allOperations({ operation, args, query }) {
                const includeOps = [
                    "findUnique",
                    "findUniqueOrThrow",
                    "findFirst",
                    "findFirstOrThrow",
                    "findMany",
                    "create",
                    "update",
                    "upsert",
                    "delete",
                ];

                if (includeOps.includes(operation)) {
                    const userArgs = args as any;

                    if (userArgs.select) {
                        userArgs.select = {
                            ...userArgs.select,
                            userRoles: {
                                select: {
                                    role: { select: { role: true } },
                                },
                            },
                        };
                    } else {
                        userArgs.include = {
                            ...userArgs.include,
                            userRoles: { include: { role: true } },
                        };
                    }

                    const result = await query(userArgs);

                    // 2. Hàm dọn dẹp (giữ nguyên logic của bạn)
                    const formatUser = (user: any) => {
                        if (!user) return user;
                        if (user.userRoles) {
                            user.roles = user.userRoles.map((ur: any) => ur.role?.role);
                            delete user.userRoles;
                        }
                        return user;
                    };

                    return Array.isArray(result) ? result.map(formatUser) : formatUser(result);
                }

                return query(args);
            },
        },
    },
});

export default prisma;
