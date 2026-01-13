import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import teamRepository from "~/repositories/team.repository";
import { ErrorWithStatus } from "~/rules/error";
interface TimeSlots {
    [date: string]: string[];
}
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
        // 1 nhóm chỉ dăng ký 1 lần
        const existingSchedule = await teamRepository.findSchedulePresentationByTeamId(teamId);
        if (existingSchedule) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "Nhóm đã đăng ký lịch trình thuyết trình, không thể đăng ký lại.",
            });
        }
        // present thử đủ 10 slot thì k cho đăng ký nữa (nếu dữ liệu cột trial_date  có data và đủ 10 cái thì k cho đăng ký)
        const schedules = await teamRepository.findAllPresentationSchedules();
        const countOnTrialDate = schedules.filter((s) => s.trialDate.length > 0).length;
        if (countOnTrialDate >= 10) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "Ngày thuyết trình thử đã đủ số nhóm đăng ký. Bạn không thể đăng ký thêm.",
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
                status: HTTP_STATUS.OK,
                message: "Bạn không có quyền xem lịch trình thuyết trình của nhóm này.",
            });
        }
        const schedule = await teamRepository.findSchedulePresentationByTeamId(teamId);
        if (!schedule) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.OK,
                message: "Lịch trình thuyết trình của nhóm không tồn tại.",
            });
        }
        return schedule;
    }

    async getSchedulePresentationAll() {
        const trialTimeSlots: TimeSlots = {
            "17/01/2026": ["10h05 - 10h50", "16h05 - 16h50", "19h05 - 19h50", "20h05 - 20h50"],
            "18/01/2026": ["15h05 - 15h50", "16h05 - 16h50", "19h05 - 19h50", "20h05 - 20h50"],
            "19/01/2026": ["09h05 - 09h50", "10h05 - 10h50", "19h05 - 19h50", "20h05 - 20h50"],
            "20/01/2026": ["19h05 - 19h50", "20h05 - 20h50"],
            "21/01/2026": ["19h05 - 19h50", "20h05 - 20h50"],
        };

        const officialTimeSlots: TimeSlots = {
            "24/01/2026": ["18h - 19h", "19h15 - 20h15"],
            "26/01/2026": ["18h - 19h", "19h15 - 20h15"],
            "27/01/2026": ["18h - 19h", "19h15 - 20h15"],
            "28/01/2026": ["18h - 19h", "19h15 - 20h15"],
            "29/01/2026": ["18h - 19h", "19h15 - 20h15"],
            "30/01/2026": ["18h - 19h", "19h15 - 20h15"],
            "31/01/2026": ["18h - 19h", "19h15 - 20h15"],
        };

        const schedules = await teamRepository.findAllPresentationSchedules();

        // Tách trialDate thành date và time slot
        const bookedTrialSlots = schedules
            .filter((s) => s.trialDate)
            .map((s) => {
                const [date, timeSlot] = s.trialDate.split("|");
                return { date, timeSlot };
            });

        const availableTrialSchedules = Object.entries(trialTimeSlots).map(([date, slots]) => ({
            date,
            slots: slots.map((slot) => ({
                time: slot,
                disabled: bookedTrialSlots.some((booked) => booked.date === date && booked.timeSlot === slot),
            })),
        }));

        const availableOfficialSchedules = Object.entries(officialTimeSlots).map(([date, slots]) => ({
            date,
            slots: slots.map((slot) => ({
                time: slot,
                // disabled: bookedOfficialDates.includes(date),
            })),
        }));

        return {
            trialSchedules: availableTrialSchedules,
            officialSchedules: availableOfficialSchedules,
        };
    }

    getSubmissionInTeam = async (userId: string, teamId: string) => {
        const isMember = await teamRepository.isMember(teamId, userId);
        if (!isMember) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Bạn không có quyền xem submission của nhóm này.",
            });
        }
        const submission = await teamRepository.findSubmissionByTeamId(teamId);
        if (!submission) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Submission của nhóm không tồn tại.",
            });
        }
        return submission;
    };

    createSubmission = async ({
        userId,
        teamId,
        presentationLink,
        productLink,
        note,
    }: {
        userId: string;
        teamId: string;
        presentationLink: string;
        productLink: string;
        note: string;
    }) => {
        const isMember = await teamRepository.isMember(teamId, userId);
        if (!isMember) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.FORBIDDEN,
                message: "Bạn không có quyền tạo submission cho nhóm này.",
            });
        }
        const created = await teamRepository.createSubmission(userId, {
            teamId,
            presentationLink,
            productLink,
            note,
        });
        return created;
    };
}

const teamService = new TeamService();
export default teamService;
