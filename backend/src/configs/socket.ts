import { Server } from "socket.io";
import http from "http";
import prisma from "./prisma";
import redisClient from "./redis"; // Import cái class bạn vừa đưa
import { Prisma } from "@prisma/client";
import { CandidateStatus } from "~/constants/enums";

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
            console.log("Received SAVE_SCORE event with payload:", payload);
            const { mentorId, codeBarem, candidateId } = payload;

            if (!mentorId || !codeBarem || !candidateId) return;

            const dataKey = `score_data:${mentorId}:${candidateId}:${codeBarem}`;
            const lockKey = `score_lock:${mentorId}:${candidateId}:${codeBarem}`;

            try {
                await redisClient.set(dataKey, JSON.stringify(payload), 60);

                const isLocked = await redisClient.exists(lockKey);

                if (!isLocked) {
                    await redisClient.set(lockKey, "locked", 1.5);

                    setTimeout(async () => {
                        try {
                            const rawData = await redisClient.get(dataKey);
                            if (!rawData) return;
                            const latestPayload = JSON.parse(rawData);

                            const result = await prisma.baremScore.upsert({
                                where: {
                                    mentorId_codeBarem_candidateId: { mentorId, codeBarem, candidateId },
                                },
                                update: {
                                    score: parseFloat(latestPayload.score || "0"),
                                    note: latestPayload.note || "",
                                },
                                create: {
                                    mentorId,
                                    candidateId,
                                    codeBarem,
                                    score: parseFloat(latestPayload.score || "0"),
                                    note: latestPayload.note || "",
                                    role: latestPayload.role || "MENTOR",
                                    type: latestPayload.type || "PROCESSING",
                                },
                            });

                            socket.emit("SCORE_SAVED", { success: true, data: result });
                        } catch (dbError) {
                            if (
                                !(dbError instanceof Prisma.PrismaClientKnownRequestError && dbError.code === "P2002")
                            ) {
                                console.error("Database Sync Error:", dbError);
                            }
                        }
                    }, 1000);
                }
            } catch (redisError) {
                console.error("Redis Error:", redisError);
            }
        });

        socket.on("APPROVE_CANDIDATE", async (payload: { candidateId: string; status: CandidateStatus }) => {
            const { candidateId, status } = payload;
            try {
                const updatedCandidate = await prisma.candidate.update({
                    where: { id: candidateId },
                    data: { statusC3: status },
                });
                socket.emit("CANDIDATE_APPROVED", { success: true, data: updatedCandidate });
            } catch (error) {
                console.error("Error approving candidate:", error);
            }
        });
    });
};
