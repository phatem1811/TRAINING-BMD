import { Request, Response, NextFunction } from "express";
import { errorResponse, serverError } from "../utils/helper/response";
import { logger } from "../config/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];
  logger.error(
    `${req.method} ${req.originalUrl} | Status: ${status} | Message: ${message} | Stack: ${err.stack}`
  );

  if (status >= 500) {
    return serverError(res, errors, message, status);
  }

  errorResponse(res, errors, message, status);
}
