import prisma from "~/configs/prisma";

class JudgeRepository {
    findRoomsByJudgeId = async (judgeId: string) => {
        const judgeRooms = await prisma.judgeRoom.findMany({
            where: {
                judgeId,
            },
            include: {
                room: {
                    include: {
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
                                schedulePresent: {
                                    select: {
                                        googleMeetLink: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const now = new Date();

        return judgeRooms
            .map((jr) => jr.room)
            .sort((a, b) => {
                const aTime = new Date(a.startTime);
                const bTime = new Date(b.startTime);

                const aDiff = Math.abs(aTime.getTime() - now.getTime());
                const bDiff = Math.abs(bTime.getTime() - now.getTime());

                return aDiff - bDiff;
            });
    };

    verifyJudgeInRoom = async (judgeId: string, roomId: string) => {
        const judgeRoom = await prisma.judgeRoom.findFirst({
            where: {
                judgeId,
                roomId,
            },
        });

        return !!judgeRoom;
    };

    findTeamsByRoomId = async (roomId: string) => {
        const room = await prisma.room.findUnique({
            where: {
                id: roomId,
            },
            include: {
                team: {
                    include: {
                        topic: true,
                        candidates: {
                            include: {
                                user: true,
                            },
                        },
                        leader: {
                            select: {
                                id: true,
                            },
                        },
                        submissions: {
                            orderBy: {
                                submittedAt: "desc",
                            },
                            take: 1,
                            include: {
                                user: {
                                    select: {
                                        fullName: true,
                                    },
                                },
                            },
                        },
                        schedulePresent: true,
                    },
                },
            },
        });

        return room?.team || null;
    };
}

export default new JudgeRepository();
