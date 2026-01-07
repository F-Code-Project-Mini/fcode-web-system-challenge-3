import { v4 as uuidv4 } from "uuid";

interface TeamType {
    id?: string;
    group: number;
    name?: string;
    mentorshipId: string;
    leaderId?: string | null;
    topicId: string;
    mentorNote?: string | null;
}

class Team {
    id: string;
    group: number;
    name?: string;
    mentorshipId: string;
    leaderId: string | null;
    topicId: string;
    mentorNote: string | null;

    constructor(team: TeamType) {
        this.id = team.id || uuidv4();
        this.group = team.group;
        this.name = team.name || "";
        this.mentorshipId = team.mentorshipId;
        this.leaderId = team.leaderId || null;
        this.topicId = team.topicId;
        this.mentorNote = team.mentorNote || null;
    }
}

export default Team;
