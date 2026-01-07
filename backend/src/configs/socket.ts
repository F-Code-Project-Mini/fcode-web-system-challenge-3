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
        socket.on("SAVE_SCORE", async (payload) => {
            // if (payload.score == "" && payload.note == "") return;
            if (payload.score <= 0 && payload.note == "") return;
            console.log("payload:", payload.score);

            try {
                const result = await prisma.baremScore.upsert({
                    where: {
                        mentorId_codeBarem_candidateId: {
                            mentorId: payload.mentorId,
                            codeBarem: payload.codeBarem,
                            candidateId: payload.candidateId,
                        },
                    },
                    update: {
                        score: parseFloat(payload.score || "0"),
                        note: payload.note,
                        mentorId: payload.mentorId,
                    },
                    create: {
                        mentorId: payload.mentorId,
                        candidateId: payload.candidateId,
                        codeBarem: payload.codeBarem,
                        score: parseFloat(payload.score || "0"),
                        note: payload.note,
                        type: "MENTOR",
                    },
                });

                socket.emit("SCORE_SAVED", result);
            } catch (error) {
                console.error("Socket SAVE_SCORE error:", error);
            }
        });
    });
};
