import http from "http";
import express from "express";
import "dotenv/config";
import { defaultErrorHandler } from "./middlewares/error.middlewares";
import { defaultSuccessHandler } from "./middlewares/success.middlewares";
import redisClient from "./configs/redis";
import cookieParser from "cookie-parser";
import "./configs/env";
import cors from "cors";
import "./seeders/database";
import rootRouter from "./routes/root.routes";
import "./workers/email.worker";
import { initSocket } from "./configs/socket";
const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : process.env.CLIENT_URL,
        credentials: true,
    }),
);
initSocket(server);
redisClient.connect();

app.use("/api/v1", rootRouter);

app.use(defaultErrorHandler);
app.use(defaultSuccessHandler);

server.listen(PORT, () => {
    console.log(`Server successfully launched on PORT ${PORT}!`);
});
