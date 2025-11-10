import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helper/jwt";
import { errorResponse } from "../utils/helper/response";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const publicPaths = ["/login", "/signup"];
    if (publicPaths.some((path) => req.originalUrl.endsWith(path))) {
      return next();
    }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, [], "No token provided", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err: any) {
    return errorResponse(res, [], "Unauthorized: Invalid token", 401);
  }
};
