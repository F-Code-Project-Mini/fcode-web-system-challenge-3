export type UserType = {
    id: string;
    email: string;
    fullName: string;
    role: RoleType;
    candidateId: string;
    createdAt: string;
    updatedAt: string;
    access_token?: string;
    refresh_token?: string;
};
export type LoginInput = {
    email: string;
    password: string;
};
type RoleType = "CANDIDATE" | "HOST" | "MENTOR" | "JUDGE" | "ADMIN";
