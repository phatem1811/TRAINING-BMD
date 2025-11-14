import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { UserService } from "../../services/staff/userService";
export const UserController = {

  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = Number(req.params.id);
      const user = await UserService.getById(userId);
      successResponse(res, user, "Get user successfully", 200);
    }
  ),
  getAllUsers: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search as string;
      const isActive: boolean =
        req.query.isActive !== undefined
          ? (req.query.isActive as string).toLowerCase() === "true"
          : true;
      const results = await UserService.getAllUsers(
        limit,
        page,
        search,
        isActive
      );
      successResponse(res, results.data, "Get all successfully", 200, {
        total: results.total,
        page: results.page,
        limit: results.limit,
        totalPages: results.totalPages,
      });
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
    unblock: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = Number(req.params.id);
      const users = await UserService.unblock(userId);
      successResponse(res, users, "unblock successfully", 200);
    }
  ),

};
