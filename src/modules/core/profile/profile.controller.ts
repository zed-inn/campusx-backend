import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/response";
import { AppError } from "@shared/errors/app-error";
import { ProfileService } from "./profile.service";
import { ProfileCreateDto } from "./dtos/profile-create.dto";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { ProfileResponseSchema } from "./dtos/profile-response.dto";

export class ProfileController {
  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) throw new AppError("Invalid user Id.", 404);

    const profileData = await ProfileService.getProfileByID(id.toString());
    const profile = ProfileResponseSchema.parse(profileData);

    return ApiResponse.success(res, "User found.", profile);
  });

  static getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const id = req.user?.id;
    if (!id) throw new AppError("Invalid Request.", 401);

    const profileData = await ProfileService.getProfileByID(id);
    const profile = ProfileResponseSchema.parse(profileData);

    return ApiResponse.success(res, "User found.", profile);
  });

  static createProfile = catchAsync(
    async (req: Request<{}, {}, ProfileCreateDto>, res: Response) => {
      const id = req.user?.id;
      if (!id) throw new AppError("Invalid Request.", 401);

      const profileData = await ProfileService.createProfile(req.body, id);
      const profile = ProfileResponseSchema.parse(profileData);

      return ApiResponse.success(res, "User created.", profile);
    }
  );

  static updateProfile = catchAsync(
    async (req: Request<{}, {}, ProfileUpdateDto>, res: Response) => {
      const id = req.user?.id;
      if (!id) throw new AppError("Invalid User Id.", 401);

      const profileData = await ProfileService.updateProfile(req.body, id);
      const profile = ProfileResponseSchema.parse(profileData);

      return ApiResponse.success(res, "User updated.", profile);
    }
  );
}
