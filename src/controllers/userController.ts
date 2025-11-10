import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/helper/response";
import { UserService } from "../services/userService";
export const UserController = {
  getProfile: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserService.getProfile(req.user.id);
      successResponse(res, user, "User profile successfully", 200);
    }
  ),
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId =  Number(req.params.id);;
      const user = await UserService.getProfile(userId);
      successResponse(res, user, "Get user successfully", 200);
    }
  ),
  getAllUsers: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const users = await UserService.getAllUsers(limit, page);
      successResponse(res, users, "Get all users successfully", 200);
    }
  ),
  getAllAdmins: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const users = await UserService.getAllAdmins(limit, page);
      successResponse(res, users, "Get all admin successfully", 200);
    }
  ),
  signUp: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await UserService.signUp(req.body);
      successResponse(res, users, "Create successfully", 200);
    }
  ),
  updateProfile: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId =  Number(req.params.id);;
      const users = await UserService.updateProfile(userId, req.body);
      successResponse(res, users, "Update successfully", 200);
    }
  ),
  delete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId =  Number(req.params.id);;
      const users = await UserService.delete(userId);
      successResponse(res, users, "Delete successfully", 200);
    }
  ),
};
