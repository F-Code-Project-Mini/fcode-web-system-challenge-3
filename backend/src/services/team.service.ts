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
        const data = await teamRepository.findWithPagination();

        return data;
    }

    async getDetail(id: string, role: RoleType) {
        const team = await teamRepository.findByIdWithMembers(id, false, role);
        if (!team) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }
        return team;
    }

    async getTeamByUserId(id: string, displayScore: boolean = false) {
        const team = await teamRepository.findByUserId(id, displayScore);
        if (!team) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }
        return team;
    }

    // async create(body: { mentorship_id: string; topic_id: string }) {
    //     const team = await teamRepository.create({
    //         mentorshipId: body.mentorship_id,
    //         topicId: body.topic_id,
    //     });
    //     return team;
    // }

    async update(id: string, body: { note: string }) {
        const existed = await teamRepository.findById(id);
        if (!existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }

        const updated = await teamRepository.update(id, {
            note: body.note,
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
    async changeName(userId: string, teamId: string, name: string) {
        const existed = await teamRepository.findById(teamId);
        if (!existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Team không tồn tại trên hệ thống.",
            });
        }
        if (existed.name) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Chỉ được phép đổi tên nhóm một lần duy nhất.",
            });
        }
        const isLeader = await teamRepository.isLeader(teamId, userId);

        if (!isLeader) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Bạn không có quyền thay đổi tên nhóm này.",
            });
        }
        // check có phải leader nhóm này không?
        const updated = await teamRepository.update(teamId, { name });
        return updated;
    }
    createSchedulePresentation = async ({
        userId,
        teamId,
        trialDate,
        officialDate,
    }: {
        userId: string;
        teamId: string;
        trialDate: string;
        officialDate: string[];
    }) => {
        // trial_date: chỉ có 1 nhóm được đăng ký, nên là check sự trùng lặp
        // check trial_date có bị trùng với nhóm khác không
        const isTrialDateExist = await teamRepository.isTrialDateExists(trialDate);
        if (isTrialDateExist) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "Ngày thuyết trình thử đã được đăng ký bởi nhóm khác, vui lòng chọn ngày khác.",
            });
        }
        const isLeader = await teamRepository.isLeader(teamId, userId);
        if (!isLeader) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Chỉ trưởng nhóm mới có quyền đăng ký lịch trình thuyết trình.",
            });
        }
        const created = await teamRepository.createPresentationSchedule({
            teamId,
            trialDate,
            officialDate,
        });
        return created;
    };

    async getSchedulePresentation(userId: string, teamId: string) {
        const isMember = await teamRepository.isMember(teamId, userId);
        if (!isMember) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Bạn không có quyền xem lịch trình thuyết trình của nhóm này.",
            });
        }
        const schedule = await teamRepository.findSchedulePresentationByTeamId(teamId);
        if (!schedule) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Lịch trình thuyết trình của nhóm không tồn tại.",
            });
        }
        return schedule;
    }
}

const teamService = new TeamService();
export default teamService;
