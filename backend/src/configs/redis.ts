import { createClient, RedisClientType } from "redis";
import { ConnectionOptions } from "bullmq";

class RedisClient {
    private client: RedisClientType;
    private isConnect = false;

    constructor() {
        this.client = createClient({
            url: process.env.URL_REDIS,
        });

        this.client.on("error", (error) => console.log(`[REDIS] Error connect: ${error}`));

        this.client.on("ready", () => {
            this.isConnect = true;
            console.log(`[REDIS] Ready connect`);
        });
    }

    connect = async () => {
        if (this.isConnect) return;

        try {
            await this.client.connect();
        } catch (err) {
            console.error("[REDIS] Initial connect failed:", err);
        }
    };

    getClientRedis = (): RedisClientType | null => {
        if (!this.isConnect) {
            console.warn("[Redis] Client not ready yet");
            return null;
        }
        return this.client;
    };

    exists = async (key: string): Promise<boolean> => {
        const result = await this.client.exists(key);
        return result === 1;
    };

    // PHẦN SỬA LỖI: Tự động chuyển EX sang PX nếu là số lẻ
    set = async (key: string, value: string, ttlSeconds?: number): Promise<void> => {
        if (ttlSeconds) {
            if (Number.isInteger(ttlSeconds)) {
                // Nếu là số nguyên (1, 2, 60...), dùng EX (giây)
                await this.client.set(key, value, { EX: ttlSeconds });
            } else {
                // Nếu là số lẻ (1.5, 0.5...), dùng PX (mili giây) để tránh lỗi "not an integer"
                const ms = Math.round(ttlSeconds * 1000);
                await this.client.set(key, value, { PX: ms });
            }
        } else {
            await this.client.set(key, value);
        }
    };

    get = async (key: string): Promise<string | null> => {
        return await this.client.get(key);
    };

    del = async (key: string): Promise<number> => {
        return await this.client.del(key);
    };

    incr = async (key: string): Promise<number> => {
        return await this.client.incr(key);
    };

    expire = async (key: string, ttlSeconds: number): Promise<number> => {
        return await this.client.expire(key, ttlSeconds);
    };
}

const redisClient = new RedisClient();
export default redisClient;

export const redisConfig: ConnectionOptions = {
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
};
