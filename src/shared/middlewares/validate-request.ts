import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};
