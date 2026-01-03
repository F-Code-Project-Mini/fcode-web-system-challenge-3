import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import teamRepository from "~/repositories/team.repository";
import { ErrorWithStatus } from "~/rules/error";

class TeamService {
    async getAll({
        page,
        limit,
        role,
        userId,
    }: {
        page?: number | string;
        limit?: number | string;
        role?: RoleType;
        userId?: string;
    }) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const safePage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;
        const safeLimit = Number.isFinite(limitNum) && limitNum > 0 ? limitNum : 10;

        const mentorId = role === RoleType.MENTOR ? userId : undefined;
        const { teams, meta } = await teamRepository.findWithPagination({
            page: safePage,
            limit: safeLimit,
            mentorId,
        });

        return {
            data: teams,
            pagination: {
                total: meta.total,
                page: meta.page,
                limit: meta.limit,
            },
        };
    }

    async getDetail(id: string) {
        const team = await teamRepository.findByIdWithMembers(id);
        if (!team) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }
        return team;
    }

    async getTeamByUserId(id: string) {
        const team = await teamRepository.findByUserId(id);
        if (!team) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }
        return team;
    }

    async create(body: { mentorship_id: string; topic_id: string }) {
        const team = await teamRepository.create({
            mentorshipId: body.mentorship_id,
            topicId: body.topic_id,
        });
        return team;
    }

    async update(id: string, body: { topic_id?: string; mentorship_id?: string }) {
        const existed = await teamRepository.findById(id);
        if (!existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }

        const updated = await teamRepository.update(id, {
            topicId: body.topic_id ?? existed.topicId,
            mentorshipId: body.mentorship_id ?? existed.mentorshipId,
        });
        return updated;
    }

    async delete(id: string) {
        const existed = await teamRepository.findById(id);
        if (!existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }
        await teamRepository.deleteById(id);
    }

    async assignMember(teamId: string, candidateId: string) {
        const result = await teamRepository.assignMember(teamId, candidateId);
        if (!result.ok) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: result.message as string,
            });
        }
    }

    async setLeader(teamId: string, candidateId: string) {
        const result = await teamRepository.setLeader(teamId, candidateId);
        if (!result.ok) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: result.message as string,
            });
        }
    }
    // async getTeamByMentor(mentorId: string) {
    //     const teams = await teamRepository.findByMentorId(mentorId);
    //     return teams;
    // }
}

const teamService = new TeamService();
export default teamService;
