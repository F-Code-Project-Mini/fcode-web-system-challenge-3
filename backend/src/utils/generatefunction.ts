import { v4 as uuidv4 } from "uuid";
import prisma from "~/configs/prisma";
import AlgoCrypto from "./crypto";
import { RoleType } from "~/constants/enums";

// // hàm sinh topic dùng để test
// export const genTopics = async (n: number) => {
//     const data = [];
//     for (let i = 1; i <= n; i++) {
//         data.push({
//             title: `topic${i}`,
//             filePath: `http://example.com/topic${i}`,
//         });
//     }
//     await prisma.topic.createMany({ data });
// };

/*
 Sinh n mentor (user role MENTOR) + n mentorship + n team gắn với n topic đầu tiên.
 - Mật khẩu mặc định: Mentor@123 (đã hash bcrypt)
 - Topic: lấy theo thứ tự mới nhất, cần tối thiểu n topic sẵn có.
 */
// export const genMentorsAndTeams = async (n = 5) => {
//     const total = n < 1 ? 1 : n;

//     // Lấy topics để gán, cần đủ số lượng
//     const topics = await prisma.topic.findMany({
//         take: total,
//         orderBy: { createdAt: "desc" },
//     });
//     if (topics.length < total) {
//         throw new Error(`Không đủ topic để gán (cần ${total}, hiện có ${topics.length}).`);
//     }

//     const passwordHash = await AlgoCrypto.hashPassword("Mentor@123");

//     const mentorUsers = [];
//     const mentorships = [];
//     const teams = [];

//     for (let i = 0; i < total; i++) {
//         const mentorId = uuidv4();
//         mentorUsers.push({
//             id: mentorId,
//             email: `mentor${i + 1}@example.com`,
//             password: passwordHash,
//             fullName: `Mentor ${i + 1}`,
//             role: RoleType.MENTOR,
//             candidateId: null,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });

//         const mentorshipId = uuidv4();
//         mentorships.push({
//             id: mentorshipId,
//             mentorId,
//         });

//         teams.push({
//             id: uuidv4(),
//             mentorshipId,
//             leaderId: null,
//             topicId: topics[i].id,
//             mentorNote: null,
//         });
//     }

//     // Tạo mentor users (bỏ qua nếu email trùng)
//     await prisma.user.createMany({
//         data: mentorUsers,
//         skipDuplicates: true,
//     });

//     // Tạo mentorships
//     await prisma.mentorship.createMany({
//         data: mentorships,
//     });

//     // Tạo teams
//     await prisma.team.createMany({
//         data: teams,
//     });

//     return {
//         mentorsCreated: mentorUsers.length,
//         mentorshipsCreated: mentorships.length,
//         teamsCreated: teams.length,
//     };
// };
