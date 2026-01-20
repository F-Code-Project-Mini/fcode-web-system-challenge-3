import prisma from "~/configs/prisma";
import { judgeRooms, roomList } from "./data-raw/rooms";
import Room from "~/schemas/room.schema";
import { judgeList } from "./data-raw/judge";

const seed = async () => {
    const count = await prisma.room.count();
    if (count > 0) {
        console.log("Database has been seeded. Exiting...");
        return;
    }

    //ADD ROOM
    for (let i = 0; i < roomList.length; i++) {
        const roomData = roomList[i];
        const room = new Room({
            roomNumber: roomData.room_number,
            startTime: roomData.start_time,
            endTime: roomData.end_time,
            teamId: await prisma.team
                .findFirst({
                    where: {
                        group: roomData.group,
                    },
                })
                .then((team) => team?.id || ""),
            modePresent: roomData.mode_present as "OFFLINE" | "ONLINE",
            presentPhase: roomData.present_phase as "TRIAL" | "OFFICIAL",
        });
        await prisma.room.create({
            data: room,
        });
    }
    // const getRooms = await prisma.room.findMany({
    //     include: {
    //         team: true,
    //     },
    // });
    // Seed judges for each room
    // Get all rooms with their teams
    const rooms = await prisma.room.findMany({
        include: {
            team: true,
        },
    });

    // Seed judges for each room
    for (const room of rooms) {
        if (!room.team) {
            console.warn(`Room ${room.roomNumber} has no team assigned.`);
            continue;
        }

        const groupNumber = room.team.group.toString();
        const judgeEmails = (judgeRooms as Record<string, { fullName: string; email: string }[]>)[groupNumber];

        if (!judgeEmails) {
            console.warn(`No judges found for group ${groupNumber}`);
            continue;
        }

        console.log(`--- Nhóm ${groupNumber} ---`);

        for (const judgeEmail of judgeEmails) {
            // Find judge by email in user table
            const user = await prisma.user.findUnique({
                where: {
                    email: judgeEmail.email,
                },
            });

            if (!user) {
                console.warn(`User with email ${judgeEmail.email} not found.`);
                continue;
            }

            await prisma.judgeRoom.create({
                data: {
                    judgeId: user.id,
                    roomId: room.id,
                },
            });
        }
    }

    console.log(`Seeded ${roomList.length} rooms.`);
};
seed();
