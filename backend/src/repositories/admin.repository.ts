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

    public createUser = async (email: string, fullName: string, role: number[]) => {
        return await prisma.user.create({
            data: {
                email,
                fullName,
                password: "",
                userRoles: {
                    create: role.map((roleId) => ({
                        roleId,
                    })),
                },
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
        const rooms = await prisma.room.findMany({
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
                        candidates: {
                            select: {
                                id: true,
                            },
                        },
                        schedulePresent: {
                            select: {
                                googleMeetLink: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        judgeRooms: true,
                    },
                },
                judgeRooms: {
                    select: {
                        id: true,
                        judge: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });

        // Sort logic giống Judge: chưa kết thúc trước, đã kết thúc sau, theo thời gian gần nhất
        const now = new Date();
        return rooms.sort((a, b) => {
            const aEndTime = new Date(a.endTime);
            const bEndTime = new Date(b.endTime);

            const aEnded = aEndTime.getTime() < now.getTime();
            const bEnded = bEndTime.getTime() < now.getTime();

            if (aEnded && !bEnded) return 1;
            if (!aEnded && bEnded) return -1;

            const aTime = new Date(a.startTime);
            const bTime = new Date(b.startTime);

            const aDiff = Math.abs(aTime.getTime() - now.getTime());
            const bDiff = Math.abs(bTime.getTime() - now.getTime());

            return aDiff - bDiff;
        });
    };

    public getRoomDetail = async (roomId: string) => {
        return await prisma.room.findUnique({
            where: { id: roomId },
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
                        candidates: {
                            select: {
                                id: true,
                                user: {
                                    select: {
                                        id: true,
                                        fullName: true,
                                    },
                                },
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
        });
    };

    public addJudgeToRoom = async (judgeId: string, roomId: string) => {
        // console.log("vô tới đây rồi", judgeId, roomId);
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

    public getAllTeams = async () => {
        return await prisma.team.findMany({
            orderBy: { group: "asc" },
            select: {
                id: true,
                group: true,
                name: true,
                leaderId: true,
                topicId: true,
                mentorNote: true,
                candidates: {
                    select: {
                        id: true,
                        studentCode: true,
                        phone: true,
                        major: true,
                        semester: true,
                        teamId: true,
                        statusC3: true,
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                            },
                        },
                    },
                },
                mentorship: {
                    select: {
                        id: true,
                        mentorId: true,
                        facebook: true,
                        discord: true,
                        phone: true,
                        mentor: {
                            select: {
                                id: true,
                                fullName: true,
                            },
                        },
                    },
                },
                leader: {
                    select: {
                        id: true,
                    },
                },
                topic: {
                    select: {
                        id: true,
                        title: true,
                        filePath: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                schedulePresent: {
                    select: {
                        id: true,
                        trialDate: true,
                        officialDate: true,
                        finalDate: true,
                    },
                },
            },
        });
    };
}

const adminRepository = new AdminRepository();
export default adminRepository;
