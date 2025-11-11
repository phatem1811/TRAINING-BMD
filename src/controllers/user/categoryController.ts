import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { CategoryService } from "../../services/user/categoryService";
export const CategoryController = {
  getAll: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const results = await CategoryService.getAll();
      successResponse(res, results, "Get all successfully", 200);
    }
  ),
  
};
