import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../utils/helper/response";
import { OrderService } from "../../services/user/orderService";

export const OrderController = {
  create: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const curentUser = Number(req.user.id);
      const result = await OrderService.create(req.body, curentUser);
      successResponse(res, result, "Orders fetched successfully", 200);
    }
  ),
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const result = await OrderService.getById(id);
      successResponse(res, result, "Order detail fetched successfully", 200);
    }
  ),
  getSummary: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const curentUser = Number(req.user.id);
      const result = await OrderService.getSummary(curentUser);
      successResponse(res, result, "Get Summary fetched successfully", 200);
    }
  ),
  getOrderHistory: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const curentUser = Number(req.user.id);
      const result = await OrderService.getOrderHistory(curentUser);
      successResponse(res, result, "Get History Order fetched successfully", 200);
    }
  ),
};
