import prisma from "~/configs/prisma";
import { RoleType } from "~/constants/enums";
import { mentorList } from "./data-raw/mentors";
import { judgeList } from "./data-raw/judge";

const seed = async () => {
    const countRoles = await prisma.roles.count();
    if (countRoles > 0) {
        console.log("Database has been seeded. Exiting...");
        return;
    }
    const rolePromises = (["CANDIDATE", "MENTOR", "JUDGE", "HOST", "ADMIN"] as RoleType[]).map((role) =>
        prisma.roles.create({
            data: { role: role },
        }),
    );
    await Promise.allSettled(rolePromises);

    // get user, mỗi user thêm role tương ứng
    const users = await prisma.user.findMany();
    const userRolePromises = users.map((user) => {
        let rolesToAdd: RoleType[] = [];
        if (mentorList.find((mentor) => mentor.email === user.email)) {
            rolesToAdd.push(RoleType.MENTOR);
        } else {
            rolesToAdd.push(RoleType.CANDIDATE);
        }

        const roleFetchPromises = rolesToAdd.map((role) =>
            prisma.roles.findFirst({
                where: { role },
            }),
        );
        return Promise.all(roleFetchPromises).then((roles) => {
            const userRoleCreatePromises = roles
                .filter((role): role is { id: number; role: RoleType } => role !== null)
                .map((role) =>
                    prisma.userRole.create({
                        data: {
                            userId: user.id,
                            roleId: role.id,
                        },
                    }),
                );
            return Promise.allSettled(userRoleCreatePromises);
        });
    });

    // add thêm role judge (nếu ch có tài khoản trong DB thì insert vô luôn)

    const judgeRole = await prisma.roles.findFirst({ where: { role: RoleType.JUDGE } });
    const judgeRolePromises = judgeList.map(async (judge) => {
        let user = users.find((u) => u.email === judge.email);
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: judge.email,
                    fullName: judge.fullName,
                    password: "",
                },
            });
        }
        if (judgeRole && user) {
            return prisma.userRole.create({
                data: {
                    userId: user.id,
                    roleId: judgeRole.id,
                },
            });
        }
    });
    await Promise.allSettled([...userRolePromises, ...judgeRolePromises]);
};
seed();
