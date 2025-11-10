import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({
    status,
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  errors: any = [],
  message = "Bad Request",
  status = 400
) => {
  return res.status(status).json({
    status,
    success: false,
    message,
    errors,
  });
};
export const notFoundResponse = (
  res: Response,
  message = "Resource not found",
  errors: any = []
) => {
  return res.status(404).json({
    status: 404,
    success: false,
    message,
    errors,
  });
};
