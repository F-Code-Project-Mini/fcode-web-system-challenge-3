import type { UserType } from "./user.types";

export type ResponsePaginate<T> = {
    status: boolean;
    message: string;
    result: {
        data: T;
        pagination: Paginate;
    };
};
export type CandidateType = {
    id: string;
    studentCode: string;
    phone: string;
    major: string;
    semester: string;
    teamId: string;
    mentorNote: string | null;
    createdAt: string;
    updatedAt: string;
    user: Omit<UserType, "candidateId"> & {
        isConfirm: boolean;
    };
};
export type TeamType = {
    id: string;
    name: string;
    mentorshipId: string;
    leaderId: string;
    topicId: string;
    mentorNote: string | null;
    candidates: CandidateType[];
    mentorship: MentorshipType;
    leader: LeaderType;
    topic: TopicType;
};
type Paginate = {
    total: number;
    page: number;
    limit: number;
};
export type MentorshipType = {
    id: string;
    mentorId: string;
    facebook: string;
    discord: string;
    phone: string;
    mentor: {
        fullName: string;
    };
};
type LeaderType = {
    id: string;
};
type TopicType = {
    id: string;
    title: string;
    filePath: string;
    createdAt: string;
    updatedAt: string;
};
export type ResponseDetailData<T> = {
    status: boolean;
    message: string;
    result: T;
};
