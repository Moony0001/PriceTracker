import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (error) => console.error("Redis Client error: ", error));

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected...");
};

export { redisClient, connectRedis };
