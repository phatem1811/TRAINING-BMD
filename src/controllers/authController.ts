import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";
import { successResponse } from "../utils/helper/response";
export const AuthController = {
  initAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await AuthService.initAdmin();
      successResponse(res, user, "Admin created successfully", 201);
    }
  ),

  login: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;
      const token = await AuthService.login(username, password);
      successResponse(res, token, "Login successful", 200);
    }
  ),
};
