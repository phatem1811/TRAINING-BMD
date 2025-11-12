import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateJoi =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return next({
        status: 400,
        message: "Validation failed",
        errors,
      });
    }
    req.body = value;
    next();
  };
