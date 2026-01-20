import prisma from "~/configs/prisma";
import Resume from "~/schemas/resume.schema";
import { challenge2List } from "./data-raw/challenge2";

const seed = async () => {
    // const candidate = await prisma.candidate.findMany();
    // for (let i = 0; i < candidate.length; i++) {
    //     if ((await prisma.interview.findFirst({ where: { candidateId: candidate[i].id } })) == null) {
    //         await prisma.interview.create({
    //             data: {
    //                 candidateId: candidate[i].id,
    //                 filePath: "challenge2/default.pdf",
    //             },
    //         });
    //     }
    // }
    const count = await prisma.interview.count();
    if (count > 0) {
        console.log("Database has been seeded. Exiting...");
        return;
    }

    for (let i = 0; i < challenge2List.length; i++) {
        try {
            const resumeData = challenge2List[i];
            const candidate = await prisma.candidate.findFirst({
                where: {
                    studentCode: resumeData.student_code,
                },
            });

            if (candidate) {
                await prisma.interview.create({
                    data: {
                        candidateId: candidate.id,
                        filePath: resumeData.file_path,
                    },
                });
            }
        } catch {}
    }
};

seed();
