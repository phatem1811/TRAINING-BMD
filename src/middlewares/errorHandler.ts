import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/helper/response";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  let status = err.status || 500;
  if (status < 400 || status >= 600) {
    status = 500;
  }
  let message = err.message || "Internal Server Error";
  let errors: any[] = err.errors || [];

  if (status >= 500) {
    message = "Internal Server Error";
    errors = [];
  }
  errorResponse(res, errors, message, status);
}
