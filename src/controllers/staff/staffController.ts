import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { StaffService } from "../../services/staff/staffService";
export const StaffController = {
  initAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const staff = await StaffService.initAdmin();
      successResponse(res, staff, "Staff profile successfully", 200);
    }
  ),
  login: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;
      const token = await StaffService.login(username, password);
      successResponse(res, token, "Login successful", 200);
    }
  ),

  getProfile: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const staff = await StaffService.getProfile(req.user.id);
      successResponse(res, staff, "Staff profile successfully", 200);
    }
  ),
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const staffId = Number(req.params.id);
      const staff = await StaffService.getProfile(staffId);
      successResponse(res, staff, "Get user successfully", 200);
    }
  ),
  getAllStaff: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search as string;
      const staffs = await StaffService.getAllStaff(limit, page, search);
      successResponse(res, staffs, "Get all users successfully", 200);
    }
  ),
  createStaff: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await StaffService.createStaff(req.body);
      successResponse(res, users, "Create successfully", 200);
    }
  ),
  updateProfile: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const staffId = Number(req.params.id);

      const staff = await StaffService.updateProfile(staffId, req.body);
      successResponse(res, staff, "Update successfully", 200);
    }
  ),
  delete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const staffId = Number(req.params.id);
      const staff = await StaffService.delete(staffId);
      successResponse(res, "", "Delete successfully", 200);
    }
  ),
  block: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const staffId = Number(req.params.id);
      const staff = await StaffService.block(staffId);
      successResponse(res, "", "Delete successfully", 200);
    }
  ),
  changePassword: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const currentUser = req.user.id;
      const { username, password, newPassword, confirmNewPassword } = req.body;
      const users = await StaffService.changePassword(
        username,
        password,
        newPassword,
        confirmNewPassword,
        currentUser
      );
      successResponse(res, users, "Change Password successfully", 200);
    }
  ),
};
