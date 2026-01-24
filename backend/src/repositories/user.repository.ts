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
    getScoreMentor = async (
        mentorId: string = "",
        userId: string,
        role: "JUDGE" | "MENTOR" = "MENTOR",
        type: "PROCESSING" | "TRIAL_PRESENTATION" | "OFFICIAL_PRESENTATION" = "PROCESSING",
        team: boolean = false,
    ) => {
        const scores = await prisma.baremScore.findMany({
            where: {
                ...(mentorId ? { mentorId } : {}),
                candidateId: userId,
                role,
                type,
                codeBarem: { startsWith: team ? "#judge_official_team_" : "#judge_official_personal_" },
                // ...(team ? { codeBarem: { startsWith: "#judge_official_team_" } } : {}),
            },
            select: {
                mentorId: true,
                score: true,
            },
        });

        if (scores.length === 0) {
            return 0;
        }

        const uniqueMentors = new Set(scores.map((s) => s.mentorId));
        const mentorCount = uniqueMentors.size;

        const totalScore = scores.reduce((sum, s) => sum + s.score, 0);

        const averageScore = totalScore / mentorCount;

        return Number(averageScore.toFixed(2));
    };
}
const userRepository = new UserRepository();
export default userRepository;
