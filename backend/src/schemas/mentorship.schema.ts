import { v4 as uuidv4 } from "uuid";

interface MentorshipType {
    id?: string;
    mentorId: string;
    facebook: string;
    discord: string;
    phone: string;
}

class Mentorship {
    id: string;
    mentorId: string;
    facebook: string;
    discord: string;
    phone: string;

    constructor(mentorship: MentorshipType) {
        this.id = mentorship.id || uuidv4();
        this.mentorId = mentorship.mentorId;
        this.facebook = mentorship.facebook;
        this.discord = mentorship.discord;
        this.phone = mentorship.phone;
    }
}

export default Mentorship;
