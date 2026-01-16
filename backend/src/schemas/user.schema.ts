import { v4 as uuidv4 } from "uuid";

interface UserType {
    id?: string;
    email: string;
    password: string;
    fullName: string;
    // roles: RoleType[];
    candidateId?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    // roles: RoleType[];
    candidateId: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: UserType) {
        this.id = user.id || uuidv4();
        this.email = user.email;
        this.password = user.password;
        this.fullName = user.fullName;
        // this.roles = user.roles || [];
        this.candidateId = user.candidateId || null;
        this.createdAt = user.createdAt || new Date();
        this.updatedAt = user.updatedAt || new Date();
    }
}

export default User;
