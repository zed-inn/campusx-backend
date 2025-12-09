import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { env } from "@config/env";
import { AppError } from "@shared/errors/app-error";

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = undefined; // For detailed validation errors

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if ((err as any).name === "SequelizeUniqueConstraintError") {
    statusCode = 409; // Conflict
    message = "Resource already exists";
    errors = (err as any).errors.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  res.status(statusCode).json({
    status: statusCode.toString().startsWith("4") ? "fail" : "error",
    message: message,
    errors: errors,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
