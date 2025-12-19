export type UserType = {
    id: string;
    email: string;
    fullName: string;
    role: RoleType;
    candidateId: string;
    createdAt: string;
    updatedAt: string;
};
export type LoginInput = {
    email: string;
    password: string;
};
type RoleType = "CANDIDATE" | "HOST" | "MENTOR" | "JUDGE" | "ADMIN";
