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
            include: {
                userRoles: true,
                candidate: {
                    omit: {
                        mentorNote: true,
                    },
                },
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
    };
    hasRole = (user: any, roleName: string) => {
        return user.userRoles.some((ur: any) => ur.role.role === roleName);
    };

    // get điểm mentor chấm userId: string
    getScoreMentor = async (userId: string) => {
        console.log("userId", userId);
        const groupUsers = await prisma.baremScore.groupBy({
            by: ["candidateId"],
            where: {
                candidateId: userId,
                type: "MENTOR",
            },
            _sum: {
                score: true,
            },
        });
        console.log("groupUsers", groupUsers);
        return Number(groupUsers[0]?._sum.score ?? 0);
    };
}
const userRepository = new UserRepository();
export default userRepository;
