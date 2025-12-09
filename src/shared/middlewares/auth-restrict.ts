import { ProfileService } from "@modules/core/profile";
import { AppError } from "@shared/errors/app-error";
import { catchAsync } from "@shared/utils/catch-async";
import { NextFunction, Request, Response } from "express";

export const isLoggedIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.user?.id === "string" && typeof req.authToken === "string")
      next();
    throw new AppError("Invalid Request.", 401);
  }
);

export const isUserProfiled = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await ProfileService.getProfileByID(req.user?.id ?? "");
    next();
  }
);

export const isUserNotProfiled = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProfileService.getProfileByID(req.user?.id ?? "");
    } catch (error) {
      next();
    }
    throw new AppError("Profile already created.", 406);
  }
);
