import Redis from "ioredis"; // Import the Redis class from ioredis library
require("dotenv").config();

// Create a Redis client
const redisClient = new Redis(process.env.REDIS_URL);

// Check if Redis connection is successful
redisClient.on("connect", () => {
  console.log("Redis connected");
});

// Check if there's an error in Redis connection
redisClient.on("error", (error) => {
  throw new Error(`Redis connection failed: ${error}`);
});

// Export the Redis client
export const redis = redisClient;
