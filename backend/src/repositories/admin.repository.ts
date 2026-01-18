import prisma from "~/configs/prisma";
import { RoleType } from "~/constants/enums";

class AdminRepository {
    public getAllUsers = async () => {
        return await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                fullName: true,
                candidateId: true,
                createdAt: true,
                candidate: {
                    select: {
                        id: true,
                        studentCode: true,
                        phone: true,
                        major: true,
                        semester: true,
                        team: {
                            select: {
                                id: true,
                                group: true,
                                name: true,
                            },
                        },
                    },
                },
                userRoles: {
                    select: {
                        role: {
                            select: {
                                role: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    };

    public getUserById = async (userId: string) => {
        return await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                candidateId: true,
                createdAt: true,
                updatedAt: true,
                candidate: {
                    select: {
                        id: true,
                        studentCode: true,
                        phone: true,
                        major: true,
                        semester: true,
                        teamId: true,
                        mentorNote: true,
                        team: {
                            select: {
                                id: true,
                                group: true,
                                name: true,
                                topic: {
                                    select: {
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                },
                userRoles: {
                    select: {
                        role: {
                            select: {
                                id: true,
                                role: true,
                            },
                        },
                        assignedAt: true,
                    },
                },
                mentorships: {
                    select: {
                        id: true,
                        facebook: true,
                        discord: true,
                        phone: true,
                        teams: {
                            select: {
                                id: true,
                                group: true,
                                name: true,
                            },
                        },
                    },
                },
                judgeRooms: {
                    select: {
                        room: {
                            select: {
                                id: true,
                                roomNumber: true,
                                presentPhase: true,
                            },
                        },
                    },
                },
            },
        });
    };

    public createUser = async (email: string, fullName: string, hashedPassword: string) => {
        return await prisma.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword,
            },
        });
    };

    public addRoleToUser = async (userId: string, roleId: number) => {
        return await prisma.userRole.create({
            data: {
                userId,
                roleId,
            },
        });
    };

    public removeRoleFromUser = async (userId: string, roleId: number) => {
        return await prisma.userRole.delete({
            where: {
                userId_roleId: {
                    userId,
                    roleId,
                },
            },
        });
    };

    public getRoleIdByName = async (roleName: RoleType) => {
        const role = await prisma.roles.findFirst({
            where: { role: roleName },
        });
        return role?.id;
    };

    public getAllRooms = async () => {
        return await prisma.room.findMany({
            select: {
                id: true,
                roomNumber: true,
                presentPhase: true,
                modePresent: true,
                startTime: true,
                endTime: true,
                team: {
                    select: {
                        id: true,
                        group: true,
                        name: true,
                        topic: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
                judgeRooms: {
                    select: {
                        id: true,
                        judge: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                roomNumber: "asc",
            },
        });
    };

    public addJudgeToRoom = async (judgeId: string, roomId: string) => {
        return await prisma.judgeRoom.create({
            data: {
                judgeId,
                roomId,
            },
        });
    };

    public removeJudgeFromRoom = async (judgeRoomId: string) => {
        return await prisma.judgeRoom.delete({
            where: { id: judgeRoomId },
        });
    };

    public getJudgeUsers = async () => {
        const judgeRole = await this.getRoleIdByName(RoleType.JUDGE);
        if (!judgeRole) return [];

        return await prisma.user.findMany({
            where: {
                userRoles: {
                    some: {
                        roleId: judgeRole,
                    },
                },
            },
            select: {
                id: true,
                fullName: true,
                email: true,
            },
        });
    };
}

const adminRepository = new AdminRepository();
export default adminRepository;
