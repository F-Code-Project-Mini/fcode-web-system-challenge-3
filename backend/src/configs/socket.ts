import { Server } from "socket.io";
import http from "http";
import prisma from "./prisma";

export const initSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : process.env.CLIENT_URL,
            credentials: true,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("SOCKET CONNECTED:", socket.id);
        socket.on("SAVE_SCORE", async (payload) => {
            if (payload.score == "" && payload.note == "") return;
            // console.log("GHi nhận login");

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
                        score: payload.score || 0,
                        note: payload.note,
                    },
                });
            } else {
                await prisma.baremScore.create({
                    data: {
                        mentorId: payload.mentorId,
                        candidateId: payload.candidateId,
                        codeBarem: payload.codeBarem,
                        score: payload.score || 0,
                        note: payload.note,
                        type: "MENTOR",
                    },
                });
            }

            socket.emit("SCORE_SAVED", payload);
        });
    });
};
