import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { UserService } from "../../services/user/userService";
export const UserController = {
  getProfile: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserService.getProfile(req.user.id);
      successResponse(res, user, "User profile successfully", 200);
    }
  ),
  login: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);
      successResponse(res, token, "Login successful", 200);
    }
  ),

  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = Number(req.params.id);
      const user = await UserService.getProfile(userId);
      successResponse(res, user, "Get user successfully", 200);
    }
  ),
  getAllUsers: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search as string
      const users = await UserService.getAllUsers(limit, page,search);
      successResponse(res, users, "Get all users successfully", 200);
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
      const userId = Number(req.params.id);
      const users = await UserService.updateProfile(userId, req.body);
      successResponse(res, users, "Update successfully", 200);
    }
  ),
  delete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = Number(req.params.id);
      const users = await UserService.delete(userId);
      successResponse(res, users, "Delete successfully", 200);
    }
  ),
  block: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = Number(req.params.id);
      const users = await UserService.block(userId);
      successResponse(res, users, "block successfully", 200);
    }
  ),
  changePassword: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const currentUser = req.user.id
      const {username, password, newPassword, confirmNewPassword} = req.body
      const users = await UserService.changePassword(username, password, newPassword, confirmNewPassword, currentUser);
      successResponse(res, users, "Change Password successfully", 200);
    }
  ),
};
