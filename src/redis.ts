import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // Replace with your Redis URL if hosted remotely
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Initialize the connection
(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Could not connect to Redis:", error);
  }
})();


export default redisClient;
