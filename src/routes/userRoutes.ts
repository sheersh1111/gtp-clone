import express from "express";
import { registerUser, loginUser, getUserProfile,logout } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get('/logout',logout)

export default router;
