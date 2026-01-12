import { v4 as uuidv4 } from "uuid";

interface SchedulePresentType {
    id?: string;
    teamId: string;
    trialDate: string;
    officialDate: string[];
    finalDate?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class SchedulePresent {
    id: string;
    teamId: string;
    trialDate: string;
    officialDate: string[];
    finalDate?: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(present: SchedulePresentType) {
        this.id = present.id || uuidv4();
        this.teamId = present.teamId;
        this.trialDate = present.trialDate;
        this.officialDate = present.officialDate;
        this.finalDate = present.finalDate || "";
        this.createdAt = present.createdAt || new Date();
        this.updatedAt = present.updatedAt || new Date();
    }
}

export default SchedulePresent;
