import { PrismaClient } from "@prisma/client";

const basePrisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
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

                    // Kiểm tra nếu đang dùng select hay include
                    if (userArgs.select) {
                        // Nếu dùng select, thêm userRoles vào select
                        userArgs.select = {
                            ...userArgs.select,
                            userRoles: {
                                select: {
                                    role: {
                                        select: {
                                            role: true,
                                        },
                                    },
                                },
                            },
                        };
                    } else {
                        // Nếu dùng include hoặc không có gì, thêm vào include
                        userArgs.include = {
                            ...userArgs.include,
                            userRoles: { include: { role: true } },
                        };
                    }

                    const result = await query(userArgs);

                    // 2. Hàm dọn dẹp object
                    const formatUser = (user: any) => {
                        if (!user) return user;

                        // Chuyển đổi dữ liệu sang mảng phẳng
                        if (user.userRoles) {
                            user.roles = user.userRoles.map((ur: any) => ur.role?.role);
                            // XÓA cái mảng userRoles xấu xí đi
                            delete user.userRoles;
                        }
                        return user;
                    };

                    // Xử lý tùy theo kết quả là mảng hay object đơn lẻ
                    return Array.isArray(result) ? result.map(formatUser) : formatUser(result);
                }

                return query(args);
            },
        },
    },
});
export default prisma;
