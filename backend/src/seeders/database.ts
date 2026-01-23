import prisma from "~/configs/prisma";
import { RoleType } from "~/constants/enums";

import Room from "~/schemas/room.schema";
import User from "~/schemas/user.schema";
const roomList = [
    // 24/01/2026 (Thứ 6) - 2 ca
    {
        group: 10,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-24T18:00:00Z",
        end_time: "2026-01-24T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 12,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-24T19:15:00Z",
        end_time: "2026-01-24T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },

    // 26/01/2026 (Thứ 2) - 2 ca
    {
        group: 8,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-26T18:00:00Z",
        end_time: "2026-01-26T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 6,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-26T19:15:00Z",
        end_time: "2026-01-26T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },

    // 27/01/2026 (Thứ 3) - 2 ca
    {
        group: 14,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-27T18:00:00Z",
        end_time: "2026-01-27T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 9,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-27T19:15:00Z",
        end_time: "2026-01-27T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },

    // 28/01/2026 (Thứ 4) - 2 ca
    {
        group: 13,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-28T18:00:00Z",
        end_time: "2026-01-28T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 11,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-28T19:15:00Z",
        end_time: "2026-01-28T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },

    // 29/01/2026 (Thứ 5) - 2 ca
    {
        group: 4,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-29T18:00:00Z",
        end_time: "2026-01-29T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 7,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-29T19:15:00Z",
        end_time: "2026-01-29T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },

    // 30/01/2026 (Thứ 6) - 2 ca
    {
        group: 2,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-30T18:00:00Z",
        end_time: "2026-01-30T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 1,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-30T19:15:00Z",
        end_time: "2026-01-30T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },

    // 31/01/2026 (Thứ 7) - 2 ca
    {
        group: 3,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-31T18:00:00Z",
        end_time: "2026-01-31T19:00:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
    {
        group: 5,
        room_number: "P106, ĐH FPT HCM",
        start_time: "2026-01-31T19:15:00Z",
        end_time: "2026-01-31T20:15:00Z",
        mode_present: "OFFLINE",
        present_phase: "OFFICIAL",
    },
];
const judgeRooms = {
    1: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    2: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    3: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    4: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    5: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    6: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    7: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    8: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    9: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    10: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    11: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    12: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    13: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
    14: [
        { fullName: "Nguyễn Bùi Quốc Huy", email: "nbquochuy@gmail.com" },
        { fullName: "Nguyễn Thanh Trí", email: "nttri.10a1cl2@gmail.com" },
        { fullName: "Phan Đức Nghĩa", email: "phanducnghiat1@gmail.com" },
        { fullName: "Phạm Thị Anh Đào", email: "daopham.ta@gmail.com" },
        { fullName: "Bùi Phạm Hoàng Lam", email: "lambui2004@gmail.com" },
    ],
};

const seed = async () => {
    const candidate = await prisma.room.findMany();
    if (candidate.length > 10) {
        console.log("Database has been seeded. Exiting...");
        return;
    }
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
            modePresent: roomData.mode_present as "OFFLINE" | "OFFLINE",
            presentPhase: roomData.present_phase as "OFFICIAL" | "OFFICIAL",
        });
        await prisma.room.create({
            data: room,
        });
    }

    const rooms = await prisma.room.findMany({
        where: {
            roomNumber: "P106, ĐH FPT HCM",
        },
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
            let user = await prisma.user.findUnique({
                where: {
                    email: judgeEmail.email,
                },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: new User({
                        email: judgeEmail.email,
                        password: "",
                        fullName: judgeEmail.fullName,
                        candidateId: null,
                    }),
                });
                // add role
                await prisma.userRole.create({
                    data: {
                        userId: user.id,
                        roleId: 3,
                    },
                });
            }

            await prisma.judgeRoom.create({
                data: {
                    judgeId: user.id,
                    roomId: room.id,
                },
            });
        }
    }
};

seed();
