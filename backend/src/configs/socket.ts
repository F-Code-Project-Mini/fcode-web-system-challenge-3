import { Server } from "socket.io";
import http from "http";
import prisma from "./prisma";

export const initSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("SOCKET CONNECTED:", socket.id);
        socket.on("SAVE_SCORE", async (payload) => {
            if (payload.score == "") return;
            console.log("GHi nhận login");

            const existed = await prisma.baremScore.findFirst({
                where: {
                    mentorId: payload.mentorId,
                    candidateId: payload.candidateId,
                    codeBarem: payload.codeBarem,
                },
            });

            if (existed) {
                await prisma.baremScore.update({
                    where: {
                        id: existed.id,
                    },
                    data: {
                        score: payload.score,
                        note: payload.note,
                    },
                });
            } else {
                await prisma.baremScore.create({
                    data: {
                        mentorId: payload.mentorId,
                        candidateId: payload.candidateId,
                        codeBarem: payload.codeBarem,
                        score: payload.score,
                        note: payload.note,
                        type: "MENTOR",
                    },
                });
            }

            socket.emit("SCORE_SAVED", payload);
        });
    });
};
