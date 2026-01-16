import type { UserRole } from "~/constants/enums";

type UserInfoRedux = {
    isLogin: boolean;
    isChecking: boolean;
    id: string;
    email: string;
    fullName: string;
    roles: UserRole[];
    candidateId: string;
    candidate?: CandidateInfoType;
    createdAt: string;
    updatedAt: string;
};
export type ReduxType = {
    userInfo: UserInfoRedux;
    isLoading: boolean;
};
type CandidateInfoType = {
    id: string;
    studentCode: string;
    phone: string;
    major: string;
    semester: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
};
