import { Request, Response, NextFunction } from "express";
import { DashboardService } from "../../services/staff/dashBoardService";
import asyncHandler from "express-async-handler";
import { successResponse } from "../../utils/helper/response";

export const DashBoardController = {
  getSummaryTopUser: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await DashboardService.getSummaryTopUser();
      successResponse(res, result, "fetched successfully", 200);
    }
  ),
  getTopProduct: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const categoryId = req.query.categoryId
        ? Number(req.query.categoryId)
        : undefined;
      const getTop = req.query.getTop ? Number(req.query.getTop) : 5;
      const result = await DashboardService.getTopProduct(categoryId, getTop);
      successResponse(res, result, "fetched successfully", 200);
    }
  ),
  getTopCategory: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await DashboardService.getTopCategory();
      successResponse(res, result, "fetched successfully", 200);
    }
  ),
  getTopOrder: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await DashboardService.getTopOrder();
      successResponse(res, result, "fetched successfully", 200);
    }
  ),
  getRevenueTodayVsLastMonth: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await DashboardService.getRevenueTodayVsLastMonth();
      successResponse(res, result, "fetched successfully", 200);
    }
  ),
  getMonthlyRevenue : asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const filterYear = Number(req.query.year)
      const result = await DashboardService.getMonthlyRevenue(filterYear);
      successResponse(res, result, "fetched successfully", 200);
    }
  ),
};
