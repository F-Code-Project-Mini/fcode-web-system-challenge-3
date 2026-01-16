import { PrismaClient } from "@prisma/client";
import { RoleType } from "~/constants/enums";
// const prisma = new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
// });
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
                    // 1. Tự động include để có dữ liệu tính toán
                    userArgs.include = {
                        ...userArgs.include,
                        userRoles: { include: { role: true } },
                    };

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
