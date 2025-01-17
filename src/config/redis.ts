import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (error) => console.error("Redis Client error: ", error));

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected...");
};

const setCache = async (key: string, value: any, ttl?: number): Promise<void> => {
  const stringValue = JSON.stringify(value);
  if(ttl){
    await redisClient.setEx(key, ttl, stringValue);
  }else {
    await redisClient.set(key, stringValue);
  }
};

const getCache = async (key: string): Promise<any | null> => {
  const cachedValue = await redisClient.get(key);
  return cachedValue ? JSON.parse(cachedValue) : null;
};

const deleteCache = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

export { redisClient, connectRedis, setCache, getCache, deleteCache };
