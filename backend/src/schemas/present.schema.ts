import { v4 as uuidv4 } from "uuid";

interface PresentType {
    id?: string;
    teamId: string;
    trialDate: string;
    officialDate: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

class Present {
    id: string;
    teamId: string;
    trialDate: string;
    officialDate: string[];
    createdAt: Date;
    updatedAt: Date;
    constructor(present: PresentType) {
        this.id = present.id || uuidv4();
        this.teamId = present.teamId;
        this.trialDate = present.trialDate;
        this.officialDate = present.officialDate;
        this.createdAt = present.createdAt || new Date();
        this.updatedAt = present.updatedAt || new Date();
    }
}

export default Present;
