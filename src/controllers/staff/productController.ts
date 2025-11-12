import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/helper/response";
import { ProductService } from "../../services/staff/productService";
export const ProductController = {
  getAll: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const filter = req.query;
      const results = await ProductService.getAll(filter);
      successResponse(
      res,
      results.data,                   
      "Get all successfully",
      200,
      {
        total: results.total,
        page: results.page,
        limit: results.limit,
        totalPages: results.totalPages,
      }
    );
    }
  ),
  create: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await ProductService.create(req.body);
      successResponse(res, result, "Create successfully", 200);
    }
  ),
  update: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const result = await ProductService.update(id, req.body);
      successResponse(res, result, "Update successfully", 200);
    }
  ),
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const result = await ProductService.getById(id);
      successResponse(res, result, "Get By id successfully", 200);
    }
  ),
  delete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await ProductService.delete(id);
      successResponse(res, "", "Delete successfully", 200);
    }
  ),
  block: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const product = await ProductService.block(id);
      successResponse(res, product, "block successfully", 200);
    }
  ),
  unBlock: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await ProductService.unBlock(id);
      successResponse(res, "", "unblock successfully", 200);
    }
  ),
};
