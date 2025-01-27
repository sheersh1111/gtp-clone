import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels";
import redisClient from "../redis";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token: string;
  if (!req.headers.authorization) {
        res.status(401).json({ message: "Login to access resource" });
      }
    
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
     throw new Error('Token has been invalidated')
    }
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
      req.user = await User.findById(decoded.id).select("-password");
      next();

    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
};
