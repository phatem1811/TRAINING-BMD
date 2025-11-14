import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { CategoryService } from "../../services/staff/categoryService";
export const CategoryController = {
  getAll: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("callllllllllllllllllllllllll")
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const results = await CategoryService.getAll(limit, page);
      successResponse(res, results.data, "Get all successfully", 200, {
        total: results.total,
        page: results.page,
        limit: results.limit,
        totalPages: results.totalPages,
      });
    }
  ),
  create: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await CategoryService.create(req.body);
      successResponse(res, result, "Create successfully", 200);
    }
  ),
  update: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const result = await CategoryService.update(id, req.body);
      successResponse(res, result, "Update successfully", 200);
    }
  ),
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const result = await CategoryService.getById(id);
      successResponse(res, result, "Get By id successfully", 200);
    }
  ),
  delete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await CategoryService.delete(id);
      successResponse(res, "", "Delete successfully", 200);
    }
  ),
  block: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await CategoryService.block(id);
      successResponse(res, "", "block successfully", 200);
    }
  ),
  unblock: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await CategoryService.unblock(id);
      successResponse(res, "", "Unblock successfully", 200);
    }
  ),
};
