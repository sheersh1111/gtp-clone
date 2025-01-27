import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import conversationRoutes from "./routes/conversationRoutes";
import promptRoutes from "./routes/promptRoutes";
import redisClient from "./redis";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/prompts", promptRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/chatgpt-clone")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
