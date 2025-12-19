import prisma from "~/configs/prisma";

class UserRepository {
    findByEmail = async (email: string) => {
        const result = await prisma.user.findUnique({
            where: { email },
        });
        return result;
    };

    findById = async (id: string) => {
        const result = await prisma.user.findUnique({
            where: { id },
            omit: {
                password: true,
            },
        });
        return result;
    };

    updatePassword = async (id: string, newPassword: string) => {
        const result = await prisma.user.update({
            where: { id },
            data: {
                password: newPassword,
            },
        });
        return result;
    }
}
const userRespository = new UserRepository();
export default userRespository;
