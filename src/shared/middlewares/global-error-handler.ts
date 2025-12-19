import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { env } from "@config/env";
import { AppError } from "@shared/errors/app-error";
import { UniqueConstraintError } from "sequelize";
import { LogService } from "@shared/modules/log";

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
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 409; // Conflict
    message = "Not available.";
    errors = err.errors.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  const errJson = {
    status: statusCode.toString().startsWith("4") ? "fail" : "error",
    message: message,
    errors: errors,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  };

  LogService.logError(`Error: ${errJson.message}`, {
    req,
    err,
    meta: errJson.errors,
  });

  if (env.NODE_ENV === "development") console.log(err);

  res.status(statusCode).json(errJson);
};
