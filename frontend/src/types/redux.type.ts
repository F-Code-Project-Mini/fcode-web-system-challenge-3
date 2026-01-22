import type { UserRole } from "~/constants/enums";
import type { StatusC3 } from "./user.types";

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
    statusC3: StatusC3;
    phone: string;
    major: string;
    semester: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
};
