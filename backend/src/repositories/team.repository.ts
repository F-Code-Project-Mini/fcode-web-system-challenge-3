import prisma from "~/configs/prisma";
import { paginate } from "~/utils/pagination";

class TeamRepository {
    findWithPagination = async ({ page, limit, mentorId }: { page?: number; limit?: number; mentorId?: string }) => {
        const where = mentorId
            ? {
                  mentorship: {
                      mentorId,
                  },
              }
            : {};

        const { data, meta } = await paginate<any>(prisma.team, {
            page,
            limit,
            where,
            orderBy: { id: "desc" },
            include: {
                candidates: true,
            },
        });

        return { teams: data, meta };
    };

    findByIdWithMembers = async (id: string) => {
        const team = await prisma.team.findUnique({
            where: { id },
            include: {
                candidates: true,
            },
        });

        if (!team) return null;

        return team;
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
            take: 1,
        });

        if (mentorTeams.length > 0) {
            return this.findByIdWithMembers(mentorTeams[0].id);
        }

        // Nếu là candidate: tìm team qua candidateId
        const candidate = await prisma.candidate.findFirst({
            where: { user: { id: userId } },
            select: { teamId: true },
        });

        if (!candidate || !candidate.teamId) return null;
        return this.findByIdWithMembers(candidate.teamId);
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
