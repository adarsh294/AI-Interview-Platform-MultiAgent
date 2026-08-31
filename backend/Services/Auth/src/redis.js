import IORedis from "ioredis";
import { logger } from "./config/env.js";

const redisUrl =
  process.env.REDIS_URL ||
  (process.env.NODE_ENV === "production"
    ? "redis://redis:6379"
    : "redis://127.0.0.1:6379");


export const redisClient = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});    


redisClient.on("connect", () => {
  logger.info(`✅ Redis Connected to ${redisUrl}`);
});

redisClient.on("ready", () => {
  logger.info("✅ Redis Ready");
});

redisClient.on("error", (err) => {
  logger.error(err, "❌ Redis Error");
});