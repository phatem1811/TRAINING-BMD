import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helper/jwt";
import { errorResponse } from "../utils/helper/response";
import { AppDataSource } from "../config/connection";
import { User } from "../entities/user";
import { Staff } from "../entities/staff";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const publicPaths = ["/api/upload", "/api/staff/auth", "/api/user/auth"];
    if (publicPaths.some((path) => req.originalUrl.startsWith(path))) {
      return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, [], "No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const userRepo = AppDataSource.getRepository(User);
    const staffRepo = AppDataSource.getRepository(Staff);
    const type = decoded.type;
    let isUser: User | Staff | null = null;
    if (type === "admin") {
      isUser = await staffRepo.findOneBy({
        id: decoded.id,
      });
    }
    if (type === "client") {
      isUser = await userRepo.findOneBy({
        id: decoded.id,
      });
    }
    if (isUser.isActive === false)
      return errorResponse(res, [], "User has been block", 403);

    if (req.originalUrl.startsWith("/api/staff") && decoded.type !== "admin") {
      return errorResponse(res, [], "Forbidden: Admin only", 403);
    }
     if (req.originalUrl.startsWith("/api/user") && decoded.type !== "client") {
      return errorResponse(res, [], "Forbidden: User only", 403);
    }
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.message === "TokenExpired") {
      return errorResponse(res, [], "Token has expired", 410);
    }
    return errorResponse(res, [], "Unauthorized: Invalid token", 401);
  }
};
