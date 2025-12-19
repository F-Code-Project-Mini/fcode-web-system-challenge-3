import { Queue } from "bullmq";
import { redisConfig } from "~/configs/redis";

// Định nghĩa cấu trúc dữ liệu của một email
export interface IEmailJobData {
    to: string;
    subject: string;
    template: string;
    context: any;
}

export const emailQueue = new Queue<IEmailJobData>("email-queue", {
    connection: redisConfig,
});

export const addEmailJob = async (data: IEmailJobData) => {
    await emailQueue.add("send-welcome-email", data, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 5000,
        },
        removeOnComplete: true,
    });
};
