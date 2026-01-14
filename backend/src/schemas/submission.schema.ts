import { v4 as uuidv4 } from "uuid";
//  id                 String   @id @default(uuid()) @db.VarChar(36)
//   teamId             String   @map("team_id") @db.VarChar(36)
//   userId             String   @map("user_id") @db.VarChar(36)
//   slideLink          String   @map("slide_link") @db.VarChar(255)
//   taskAssignmentLink String   @map("task_assignment_link") @db.VarChar(255)
//   productLinks       Json     @map("product_links") @db.Json
//   note               String?  @db.Text
//   submittedAt        DateTime @map("submitted_at")
interface SubmissionType {
    id?: string;
    teamId: string;
    userId: string;
    slideLink: string;
    taskAssignmentLink: string;
    productLinks: string[];
    note?: string;
    submittedAt?: Date;
}

class Submission {
    id: string;
    teamId: string;
    userId: string;
    slideLink: string;
    taskAssignmentLink: string;
    productLinks: string[];
    note: string;
    submittedAt: Date;

    constructor(submission: SubmissionType) {
        this.id = submission.id || uuidv4();
        this.teamId = submission.teamId;
        this.userId = submission.userId;
        this.slideLink = submission.slideLink;
        this.taskAssignmentLink = submission.taskAssignmentLink;
        this.productLinks = submission.productLinks;
        this.note = submission.note || "";
        this.submittedAt = submission.submittedAt || new Date();
    }
}

export default Submission;
