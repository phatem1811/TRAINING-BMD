import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../utils/helper/response";
import { OrderService } from "../../services/staff/orderService";

export const OrderController = {
  getAll: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const filter = req.query;
      const result = await OrderService.getAll(filter);
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

  confirmOrder: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await OrderService.confirmOrder(id);
      successResponse(res, null, "Order confirmed", 200);
    }
  ),

  shippingOrder: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await OrderService.shippingOrder(id);
      successResponse(res, null, "Order is shipping", 200);
    }
  ),

  completeOrder: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await OrderService.completeOrder(id);
      successResponse(res, null, "Order completed", 200);
    }
  ),

  cancelOrder: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await OrderService.cancelOrder(id);
      successResponse(res, null, "Order cancelled", 200);
    }
  ),

  confirmPaid: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await OrderService.confirmPaid(id);
      successResponse(res, null, "Order paid", 200);
    }
  ),

  refundOrder: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      await OrderService.refundOrder(id);
      successResponse(res, null, "Order refunded", 200);
    }
  ),
};
