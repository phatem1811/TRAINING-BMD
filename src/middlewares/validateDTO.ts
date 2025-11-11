import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/helper/badRequest";

export const validateDTO = (DTOClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(DTOClass, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const messages = errors
        .map((e) => Object.values(e.constraints || {}))
        .flat();
      return next(new BadRequest("Validation failed", 400, messages));
    }
    req.body = dto;
    next();
  };
};


