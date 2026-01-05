import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export class ValidateReq {
  static body = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);

        next();
      } catch (error) {
        next(error);
      }
    };
  };

  static query = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const rawQuery = req.query || {};
        const parsedQuery = schema.parse(rawQuery);

        Object.defineProperty(req, "query", {
          value: parsedQuery,
          writable: true,
          enumerable: true,
          configurable: true,
        });

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
