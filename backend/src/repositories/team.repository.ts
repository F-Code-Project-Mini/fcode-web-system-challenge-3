import prisma from "~/configs/prisma";
import { paginate } from "~/utils/pagination";
import userRespository from "./user.repository";
import { RoleType } from "~/constants/enums";
import Present from "~/schemas/schedule-present.schema";
import SchedulePresent from "~/schemas/schedule-present.schema";
import Submission from "~/schemas/submission.schema";
import { SubmissionType } from "~/rules/requests/team.request";

class TeamRepository {
    findWithPagination = async () => {
        const includeUser = {
            omit: {
                password: true,
                candidateId: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        };
        const include = {
            candidates: {
                include: {
                    user: includeUser,
                },
                omit: {
                    phone: true,
                    // major: true,
                    semester: true,
                    mentorNote: true,
                    createdAt: true,
                    updatedAt: true,
                    teamId: true,
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

        // const { data, meta } = await paginate<any>(prisma.team, {
        //     page,
        //     limit,
        //     orderBy: { id: "desc" },
        //     include,
        //     omit: {
        //         mentorNote: true,
        //     },
        // });
        const data = prisma.team.findMany({
            orderBy: { group: "asc" },
            // include,
            include: {
                ...include,
                schedulePresent: {
                    omit: {
                        officialDate: true,
                        // finalDate: true,
                        createdAt: true,
                        updatedAt: true,
                        googleMeetLink: true,
                    },
                },
            },
            omit: {
                mentorNote: true,
            },
        });

        return data;
    };

    findByIdWithMembers = async (id: string, displayScore: boolean = false, role: RoleType) => {
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
        console.log("role", role);

        let team = await prisma.team.findUnique({
            where: { id },
            include,
            omit: {
                ...([RoleType.MENTOR, RoleType.ADMIN].includes(role) ? {} : { mentorNote: true }),
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
            data.push(await this.findByIdWithMembers(t.id, displayScore, RoleType.MENTOR));
        }
        return data;
    };

    update = async (id: string, data: { name?: string; note?: string }) => {
        return prisma.team.update({
            where: { id },
            data: {
                ...(data.name ? { name: data.name } : {}),
                ...(data.note ? { mentorNote: data.note } : {}),
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

    isMember = async (teamId: string, userId: string) => {
        const team = await prisma.user.findUnique({
            where: {
                id: userId,
                candidate: {
                    teamId: teamId,
                },
            },
        });
        return !!team;
    };

    isTrialDateExists = async (trialDate: string) => {
        if (!trialDate || trialDate.trim() === "") return false;
        const team = await prisma.schedulePresent.findFirst({
            where: {
                trialDate,
            },
        });
        return !!team;
    };

    createPresentationSchedule = async (data: { teamId: string; trialDate: string; officialDate: string[] }) => {
        return prisma.schedulePresent.create({
            data: new SchedulePresent({
                teamId: data.teamId,
                trialDate: data.trialDate,
                officialDate: data.officialDate,
            }),
        });
    };

    findSchedulePresentationByTeamId = async (teamId: string) => {
        return prisma.schedulePresent.findFirst({
            where: {
                teamId,
            },
        });
    };

    findAllPresentationSchedules = async () => {
        return prisma.schedulePresent.findMany();
    };
    findSubmissionByTeamId = async (teamId: string) => {
        return prisma.submission.findMany({
            where: {
                teamId,
            },
            orderBy: {
                submittedAt: "desc",
            },
        });
    };
    createSubmission = async (userId: string, data: SubmissionType & { teamId: string }) => {
        return prisma.submission.create({
            data: new Submission({
                teamId: data.teamId,
                userId,
                slideLink: data.slideLink,
                taskAssignmentLink: data.taskAssignmentLink,
                productLinks: data.productLinks,
                note: data.note,
            }),
        });
    };
}

const teamRepository = new TeamRepository();
export default teamRepository;
