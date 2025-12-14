import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateRequestBody = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};
