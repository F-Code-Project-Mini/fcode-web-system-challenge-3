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
