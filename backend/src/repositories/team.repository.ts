import prisma from "~/configs/prisma";
import { paginate } from "~/utils/pagination";
import userRespository from "./user.repository";

class TeamRepository {
    findWithPagination = async ({ page, limit, mentorId }: { page?: number; limit?: number; mentorId?: string }) => {
        const includeUser = {
            omit: {
                password: true,
                candidateId: true,
            },
        };
        const include = {
            candidates: {
                include: {
                    user: includeUser,
                },
            },
            mentorship: {
                select: {
                    mentor: {
                        select: { fullName: true },
                    },
                },
            },
            leader: {
                select: {
                    id: true,
                },
            },
            topic: true,
        };

        const { data, meta } = await paginate<any>(prisma.team, {
            page,
            limit,
            orderBy: { id: "desc" },
            include,
        });

        return { teams: data, meta };
    };

    findByIdWithMembers = async (id: string, displayScore: boolean = false) => {
        const include = {
            candidates: {
                omit: {
                    mentorNote: true,
                },
                include: {
                    user: {
                        omit: {
                            // password: true,
                            candidateId: true,
                        },
                    },
                },
            },
            leader: {
                omit: {
                    mentorNote: true,
                },
            },
            mentorship: {
                include: {
                    mentor: {
                        omit: {
                            password: true,
                        },
                    },
                },
            },
            topic: true,
        };

        let team = await prisma.team.findUnique({
            where: { id },
            include,
            omit: {
                mentorNote: true,
            },
        });

        if (!team) return null;

        const candidatesWithScores = await Promise.all(
            team.candidates.map(async (candidate) => {
                if (!candidate.user) {
                    return candidate;
                }

                const scoreMentor = displayScore ? await userRespository.getScoreMentor(candidate.id) : null;

                const { password, ...userWithoutPassword } = candidate.user;

                return {
                    ...candidate,
                    scoreMentor,
                    user: {
                        ...userWithoutPassword,
                        isConfirm: !!password,
                    },
                };
            }),
        );

        const teamNew = {
            ...team,
            candidates: candidatesWithScores,
        };
        return teamNew;
    };

    findByUserId = async (userId: string, displayScore: boolean = false) => {
        // Nếu là mentor: tìm các team thuộc mentorship của mentor đó
        const mentorTeams = await prisma.team.findMany({
            where: {
                mentorship: {
                    mentorId: userId,
                },
            },
            select: {
                id: true,
            },
        });

        const data = [];
        console.log("mentorTeams", mentorTeams);
        for (const t of mentorTeams) {
            data.push(await this.findByIdWithMembers(t.id, displayScore));
        }
        return data;
    };

    update = async (id: string, data: { name?: string; topicId?: string; mentorshipId?: string }) => {
        return prisma.team.update({
            where: { id },
            data: {
                ...(data.topicId ? { topicId: data.topicId } : {}),
                ...(data.mentorshipId ? { mentorshipId: data.mentorshipId } : {}),
                ...(data.name ? { name: data.name } : {}),
            },
        });
    };

    deleteById = async (id: string) => {
        return prisma.team.delete({
            where: { id },
        });
    };

    findById = async (id: string) => {
        return prisma.team.findUnique({
            where: { id },
        });
    };

    assignMember = async (teamId: string, candidateId: string) => {
        const candidate = await prisma.candidate.findUnique({ where: { id: candidateId }, select: { teamId: true } });
        if (!candidate) {
            return { ok: false, message: "Ứng viên không tồn tại." };
        }

        if (candidate.teamId && candidate.teamId !== teamId) {
            return { ok: false, message: "Ứng viên đang thuộc một team khác." };
        }

        await prisma.candidate.update({
            where: { id: candidateId },
            data: { teamId },
        });

        return { ok: true };
    };

    setLeader = async (teamId: string, candidateId: string) => {
        const candidate = await prisma.candidate.findUnique({
            where: { id: candidateId },
            select: { teamId: true },
        });

        if (!candidate || candidate.teamId !== teamId) {
            return { ok: false, message: "Leader phải thuộc team này thì mới có thể cập nhật!" };
        }

        await prisma.team.update({
            where: { id: teamId },
            data: { leaderId: candidateId },
        });

        return { ok: true };
    };
    isLeader = async (teamId: string, userId: string) => {
        const team = await prisma.team.findUnique({
            where: {
                id: teamId,
                leader: {
                    user: {
                        id: userId,
                    },
                },
            },
        });
        return !!team;
    };
}

const teamRepository = new TeamRepository();
export default teamRepository;
