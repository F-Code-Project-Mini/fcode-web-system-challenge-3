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
                                        videoRecord: true,
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
                const aEndTime = new Date(a.endTime);
                const bEndTime = new Date(b.endTime);

                const aEnded = aEndTime.getTime() < now.getTime();
                const bEnded = bEndTime.getTime() < now.getTime();

                // Nếu một phòng đã kết thúc và phòng kia chưa, đưa phòng đã kết thúc xuống cuối
                if (aEnded && !bEnded) return 1;
                if (!aEnded && bEnded) return -1;

                // Nếu cả hai cùng trạng thái, sắp xếp theo startTime gần thời gian hiện tại nhất
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
                        noteJudge: {
                            select: {
                                note: true,
                            }
                        },
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

    getDetailRoom = async (roomId: string) => {
        const room = await prisma.room.findUnique({
            where: {
                id: roomId,
            },
        });
        return room;
    };

    updateNote = async (judgeId: string, teamId: string, note: string) => {
        const noteJudge = await prisma.noteJudge.upsert({
            where: {
                teamId,
            },
            update: {
                note,
            },
            create: {
                judgeId,
                teamId,
                note,
            },
        });
        return noteJudge;
    };
}

export default new JudgeRepository();
