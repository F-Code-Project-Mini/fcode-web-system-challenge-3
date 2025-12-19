import { Worker, Job } from "bullmq";
import nodemailer from "nodemailer";
import { IEmailJobData } from "../queues/email.queue";
import { redisConfig } from "~/configs/redis";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export const emailWorker = new Worker<IEmailJobData>(
    "email-queue",
    async (job: Job<IEmailJobData>) => {
        const { to, subject, template, context } = job.data;

        const templatePath = path.join(process.cwd(), "templates", `${template}.html`);
        console.log(templatePath);

        const source = fs.readFileSync(templatePath, "utf8");

        const compiledTemplate = handlebars.compile(source);
        const htmlToSend = compiledTemplate(context);

        console.log(`[Worker] Đang xử lý job ${job.id} cho email: ${to}`);

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: htmlToSend,
        });

        console.log(`[Worker] Hoàn thành gửi mail tới ${to}`);
    },
    { connection: redisConfig },
);

emailWorker.on("failed", (job, err) => {
    console.error(`[Worker] Job ${job?.id} thất bại: ${err.message}`);
});
