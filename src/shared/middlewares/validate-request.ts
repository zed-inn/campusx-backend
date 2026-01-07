import { Request, Response, NextFunction, raw } from "express";
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

        // convert `null` values to undefined, so parser can handle them on its own
        for (const k in rawQuery) {
          if (!Object.hasOwn(rawQuery, k)) continue;
          if (rawQuery[k] === "null") rawQuery[k] = undefined;
        }

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
