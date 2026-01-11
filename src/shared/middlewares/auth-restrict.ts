import { Profile } from "@modules/core/profile/profile.model";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { AppError } from "@shared/errors/app-error";
import { catchAsync } from "@shared/utils/catch-async";
import { NextFunction, Request, Response } from "express";

export class RestrictTo {
  static loggedInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      AuthPayloadSchema.parse(req.user);
      next();
    } catch {
      throw new AppError("Unauthorized.", 401);
    }
  };

  static profiledUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const reqUser = AuthPayloadSchema.parse(req.user);
      const profile = await Profile.findByPk(reqUser.id);
      if (!profile)
        throw new AppError(
          "Please complete your profile before you can access these services.",
          403
        );
      next();
    }
  );

  static adminUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const reqUser = AuthPayloadSchema.parse(req.user);
    if (reqUser.role !== "ADMIN") throw new AppError("Forbidden", 403);
    next();
  };
}
