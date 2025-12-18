import type { UserRole } from "~/constants/enums";

type UserInfoRedux = {
    isLogin: boolean;
    isChecking: boolean;
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    candidateId: string;
    createdAt: string;
    updatedAt: string;
};
export type ReduxType = {
    userInfo: UserInfoRedux;
    isLoading: boolean;
};
