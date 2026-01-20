import { v4 as uuidv4 } from "uuid";

interface ResumeType {
    id?: string;
    candidateId: string;
    filePath: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Resume {
    id: string;
    candidateId: string;
    filePath: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(resume: ResumeType) {
        this.id = resume.id || uuidv4();
        this.candidateId = resume.candidateId;
        this.filePath = resume.filePath;
        this.createdAt = resume.createdAt || new Date();
        this.updatedAt = resume.updatedAt || new Date();
    }
}

export default Resume;
