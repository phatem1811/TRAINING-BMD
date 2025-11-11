import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { ProductService } from "../../services/user/productService";
export const ProductController = {
  getAll: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const filter = req.query;
      const results = await ProductService.getAll(filter);
      successResponse(res, results, "Get all successfully", 200);
    }
  ),
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const result = await ProductService.getById(id);
      successResponse(res, result, "Get By id successfully", 200);
    }
  ),

};
