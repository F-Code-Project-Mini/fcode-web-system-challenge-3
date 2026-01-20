import prisma from "~/configs/prisma";
import { resumeList } from "./data-raw/resume";
import Resume from "~/schemas/resume.schema";

const seed = async () => {
    const count = await prisma.resume.count();
    if (count > 0) {
        console.log("Database has been seeded. Exiting...");
        return;
    }

    for (let i = 0; i < resumeList.length; i++) {
        const resumeData = resumeList[i];
        const candidate = await prisma.candidate.findFirst({
            where: {
                studentCode: resumeData.student_code,
            },
        });

        if (candidate) {
            await prisma.resume.create({
                data: {
                    candidateId: candidate.id,
                    filePath: resumeData.final_submit,
                },
            });
        }
    }
};

seed();
