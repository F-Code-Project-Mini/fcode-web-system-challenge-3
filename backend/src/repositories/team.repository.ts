import prisma from "~/configs/prisma";
import { paginate } from "~/utils/pagination";

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

    findByIdWithMembers = async (id: string) => {
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

        // Remove password from user objects in candidates
        const teamNew = {
            ...team,
            candidates: team.candidates.map((candidate) => {
                if (!candidate.user) {
                    return candidate;
                }
                const { password, ...userWithoutPassword } = candidate.user;

                Object.assign(candidate.user, userWithoutPassword, { isConfirm: !!password });
                return candidate;
            }),
        };
        return teamNew;
    };

    findByUserId = async (userId: string) => {
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
            // take: 1,
        });

        const data = [];
        console.log("mentorTeams", mentorTeams);
        for (const t of mentorTeams) {
            data.push(await this.findByIdWithMembers(t.id));
        }
        return data;

        // // Nếu là candidate: tìm team qua candidateId
        // const candidate = await prisma.candidate.findFirst({
        //     where: { user: { id: userId } },
        //     select: { teamId: true },
        // });

        // if (!candidate || !candidate.teamId) return null;
        // return this.findByIdWithMembers(candidate.teamId);
    };

    create = async ({
        mentorshipId,
        topicId,
        mentorNote,
    }: {
        mentorshipId: string;
        topicId: string;
        mentorNote?: string | null;
    }) => {
        return prisma.team.create({
            data: {
                name: "",
                mentorshipId,
                topicId,
                mentorNote: mentorNote ?? null,
            },
        });
    };

    update = async (id: string, data: { topicId?: string; mentorshipId?: string }) => {
        return prisma.team.update({
            where: { id },
            data: {
                ...(data.topicId ? { topicId: data.topicId } : {}),
                ...(data.mentorshipId ? { mentorshipId: data.mentorshipId } : {}),
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
}

const teamRepository = new TeamRepository();
export default teamRepository;
