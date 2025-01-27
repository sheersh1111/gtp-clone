import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/userModels";
import redisClient from "../redis";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
};

export const registerUser = async (req: any, res: Response):Promise<any> => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user:any = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user:any = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserProfile = async (req: any, res: Response) => {
  const user = req.user as IUser;
  res.status(200).json(user);
};


export const logout = async (req: any, res: Response):Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

  if (!token) {
    res.status(400).json({ error: "Token not provided" });
    return;
  }

  try {
    // Add token to Redis with an expiration time matching the token's expiration

    await redisClient.set(token, "blacklisted", { EX: 3600 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  } 
}