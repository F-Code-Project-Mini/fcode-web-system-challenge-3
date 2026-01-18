import type { RoleType } from "./user.types";

export interface AdminUserType {
    id: string;
    email: string;
    fullName: string;
    candidateId: string | null;
    createdAt: string;
    roles: RoleType[];
    candidate: {
        id: string;
        studentCode: string;
        phone: string;
        major: string;
        semester: string;
        team?: {
            id: string;
            group: number;
            name?: string;
        };
    } | null;
}

export interface AdminUserDetailType {
    id: string;
    email: string;
    fullName: string;
    candidateId: string | null;
    createdAt: string;
    updatedAt: string;
    candidate: {
        id: string;
        studentCode: string;
        phone: string;
        major: string;
        semester: string;
        teamId: string | null;
        mentorNote: string | null;
        team?: {
            id: string;
            group: number;
            name?: string;
            topic?: { title: string };
        };
    } | null;
    roles: Array<{
        roleId: number;
        role: RoleType;
        assignedAt: string;
    }>;
    mentorships: Array<{
        id: string;
        facebook: string;
        discord: string;
        phone: string;
        teams: Array<{ id: string; group: number; name?: string }>;
    }>;
    judgeRooms: Array<{
        room: {
            id: string;
            roomNumber: string;
            presentPhase: string;
        };
    }>;
}

export interface CreateUserRequest {
    email: string;
    fullName: string;
}

export interface CreateUserResponse {
    id: string;
    email: string;
    fullName: string;
    defaultPassword: string;
    createdAt: string;
}

export interface AddRoleRequest {
    role: RoleType;
}

export interface AddJudgeToRoomRequest {
    judgeId: string;
}

export interface JudgeUserType {
    id: string;
    fullName: string;
    email: string;
}

export interface AdminRoomType {
    id: string;
    roomNumber: string;
    presentPhase: string;
    modePresent: string;
    startTime: string;
    endTime: string;
    team?: {
        id: string;
        group: number;
        name?: string;
        topic?: { title: string };
    };
    judgeRooms: Array<{
        id: string;
        judge: {
            id: string;
            fullName: string;
            email: string;
        };
    }>;
}

export interface ResponseDetailData<T> {
    status: boolean;
    message: string;
    result: T;
}

export interface AdminTeamType {
    id: string;
    group: number;
    name: string | null;
    leaderId: string;
    topicId: string;
    mentorNote: string | null;
    candidates: AdminCandidateType[];
    mentorship: {
        id: string;
        mentorId: string;
        facebook: string;
        discord: string;
        phone: string;
        mentor: {
            id: string;
            fullName: string;
        };
    };
    leader: {
        id: string;
    };
    topic: {
        id: string;
        title: string;
        filePath: string;
        createdAt: string;
        updatedAt: string;
    };
    schedulePresent: {
        id: string;
        trialDate: string;
        officialDate: string[];
        finalDate: string;
    } | null;
}

export interface AdminCandidateType {
    id: string;
    studentCode: string;
    phone: string;
    major: string;
    semester: string;
    teamId: string;
    user: {
        id: string;
        fullName: string;
        email: string;
    };
    scoreMentor: number | null;
    scoreJudge: number | null;
}
