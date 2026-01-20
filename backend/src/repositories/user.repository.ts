import prisma from "~/configs/prisma";
import { RoleType } from "~/constants/enums";

class UserRepository {
    findByEmail = async (email: string) => {
        const result = await prisma.user.findUnique({
            where: { email },
        });
        return result;
    };

    findById = async (id: string) => {
        console.log("id", id);
        const result = await prisma.user.findUnique({
            where: { id },

            omit: {
                password: true,
            },
            include: {
                // userRoles: true,
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
    hasRole = (userId: string, role: RoleType) => {
        return prisma.userRole.findFirst({
            where: {
                userId,
                role: {
                    role,
                },
            },
        });
    };

    // get điểm mentor chấm userId: string
    getScoreMentor = async (mentorId: string, userId: string, role: "JUDGE" | "MENTOR" = "MENTOR") => {
        // console.log("userId", userId);
        const groupUsers = await prisma.baremScore.groupBy({
            by: ["candidateId"],
            where: {
                mentorId,
                candidateId: userId,
                role,
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
