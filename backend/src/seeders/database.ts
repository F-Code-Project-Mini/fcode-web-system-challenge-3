import prisma from "~/configs/prisma";
import { studentList } from "./data-raw/students";
import Candidate from "~/schemas/candidate.schema";
import User from "~/schemas/user.schema";
import { RoleType } from "~/constants/enums";
import AlgoCrypto from "~/utils/crypto";

const seed = async () => {
    const countCandidate = await prisma.candidate.count();
    if (countCandidate > 0) {
        console.log("Database has been seeded. Exiting...");
        return;
    }

    const promises = [];
    const promiseAccount = [];
    const mentorPromises = [];
    for (let student of studentList) {
        // candidate
        // const hashedPassword = await AlgoCrypto.hashPassword("Demo@123");
        const candidate = new Candidate({
            studentCode: student.student_code,
            phone: student.phone,
            major: student.major,
            semester: student.semester,
        });

        const user = new User({
            email: student.email,
            password: "",
            fullName: student.full_name,
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
    for (let mentor of mentorList) {
        const user = new User({
            email: mentor.email,
            password: "",
            fullName: mentor.fullName,
            role: RoleType.MENTOR,
        });
        promiseAccount.push(
            prisma.user.create({
                data: user,
            }),
        );
    }
    await Promise.all(promises);
    await Promise.all(promiseAccount);
};
seed();
