import { v4 as uuidv4 } from "uuid";
// model Present {
//   id                 String   @id @default(uuid()) @db.VarChar(36)
//   teamId             String   @map("team_id") @db.VarChar(36)
//   tentativeSchedule  String   @map("tentative_schedule") @db.Json
//   finalSchedule      String   @map("final_schedule") @db.Json
//   createdAt          DateTime @default(now()) @map("created_at")
//   updatedAt          DateTime @updatedAt @map("updated_at")

//   team Team @relation(fields: [teamId], references: [id])

//   @@map("presents")
// }
interface PresentType {
    id?: string;
    teamId: string;
    tentativeSchedule: string;
    finalSchedule: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Present {
    id: string;
    teamId: string;
    tentativeSchedule: string;
    finalSchedule: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(present: PresentType) {
        this.id = present.id || uuidv4();
        this.teamId = present.teamId;
        this.tentativeSchedule = present.tentativeSchedule;
        this.finalSchedule = present.finalSchedule;
        this.createdAt = present.createdAt || new Date();
        this.updatedAt = present.updatedAt || new Date();
    }
}

export default Present;
