import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/helper/response";
import { UploadService } from "../services/uploadService";

export const UploadController = {
  uploadImage: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UploadService.uploadImage(req);
    successResponse(res, result, "Upload image successfully", 200);
  }),

  uploadFile: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UploadService.uploadFile(req);
    successResponse(res, result, "Upload file successfully", 200);
  }),
};
