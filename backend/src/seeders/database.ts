import prisma from "~/configs/prisma";
import { studentList } from "./data-raw/students";
import Candidate from "~/schemas/candidate.schema";
import User from "~/schemas/user.schema";
import { RoleType } from "~/constants/enums";
import Mentorship from "~/schemas/mentorship.schema";
import { mentorList } from "./data-raw/mentors";
import Topic from "~/schemas/topic.schema";
import Team from "~/schemas/team.schema";
import { topicsList } from "./data-raw/topics";

const seed = async () => {
    const countCandidate = await prisma.candidate.count();
    if (countCandidate > 0) {
        console.log("Database has been seeded. Exiting...");
        return;
    }

    const promises = [];
    const promiseAccount = [];

    // add thành viên
    for (let student of studentList) {
        for (let candidates of student.candidates) {
            // candidate
            // const hashedPassword = await AlgoCrypto.hashPassword("Demo@123");
            const candidate = new Candidate({
                studentCode: candidates.student_code,
                phone: candidates.phone,
                major: candidates.major,
                semester: candidates.semester,
            });

            const user = new User({
                email: candidates.email,
                password: "",
                fullName: candidates.full_name,
                role: RoleType.CANDIDATE,
                candidateId: candidate.id,
            });
            promises.push(
                prisma.candidate.create({
                    data: candidate,
                }),
            );
            // add thông tin bên candidate vào user
            promiseAccount.push(
                prisma.user.create({
                    data: user,
                }),
            );
        }
    }

    // add mentor
    const mentorPromises = [];
    const mentorShipInfoPromises = [];
    for (let mentor of mentorList) {
        const user = new User({
            email: mentor.email,
            password: "$2b$10$.oIjaNHYprdhLa1EQVaMfe7L3qmCURyq0u99Pb9hlF1jbmNQAs.bC", // Demo@123
            fullName: mentor.fullName,
            role: RoleType.MENTOR,
        });
        mentorPromises.push(
            prisma.user.create({
                data: user,
            }),
        );
        mentorShipInfoPromises.push(
            prisma.mentorship.create({
                data: new Mentorship({
                    mentorId: user.id,
                    facebook: mentor.facebook,
                    discord: mentor.username,
                    phone: mentor.phone,
                }),
            }),
        );
    }

    // add topic
    const toppicPromises = [];
    for (let topic of topicsList) {
        toppicPromises.push(
            prisma.topic.create({
                data: new Topic({
                    filePath: topic.link,
                    title: topic.title,
                }),
            }),
        );
    }

    // add teams (cứ 5 người đầu tiên 1 nhóm)
    console.log("Seeding database...");
    await Promise.allSettled([...promises, ...mentorPromises, ...toppicPromises]);
    await Promise.allSettled([...promiseAccount, ...mentorShipInfoPromises]);

    // add team
    const teamsPromise = [];
    for (const team of studentList) {
        const topic = await prisma.topic.findFirst({
            where: { title: topicsList[team.topic].title },
        });
        const mentor = await prisma.mentorship.findFirst({
            where: { phone: mentorList.find((m) => m.email === team.mentor)?.phone || "" },
        });
        teamsPromise.push(
            prisma.team.create({
                data: new Team({
                    topicId: topic?.id || "",
                    name: team.name,
                    mentorshipId: mentor?.id || "",
                }),
            }),
        );
    }
    await Promise.allSettled([...teamsPromise]);

    // tiến hành update teamId cho từng candidate
    for (const team of studentList) {
        const teamRecord = await prisma.team.findFirst({
            where: { name: team.name },
        });
        for (const candidateInfo of team.candidates) {
            await prisma.candidate.updateMany({
                where: { studentCode: candidateInfo.student_code },
                data: { teamId: teamRecord?.id || null },
            });
        }
    }

    // lấy
    console.log("Database seeding completed.");
};
seed();
