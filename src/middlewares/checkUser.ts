// src/middlewares/checkUser.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/connection";
import { User } from "../entities/user";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // gán thông tin user vào req.user
    next();
  } catch (err) {
    next(err);
  }
};
