import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { ProfileService } from "./profile.service";
import { ProfileCreateDto } from "./dtos/profile-create.dto";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { ProfileResponseSchema } from "./dtos/profile-response.dto";
import { z } from "zod";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";

export class ProfileController {
  static getMyReferralCode = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const referralCode = await ProfileService.getReferralCodeById(user.id);

    return ApiResponse.success(res, "Your referral code.", { referralCode });
  });

  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const id = z.uuidv4().parse(req.query.id);

    const profileData = await ProfileService.getById(id);
    const profile = ProfileResponseSchema.parse(profileData);

    return ApiResponse.success(res, "User found.", profile);
  });

  static getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const profileData = await ProfileService.getById(user.id);
    const profile = ProfileResponseSchema.parse(profileData);

    return ApiResponse.success(res, "User found.", profile);
  });

  static createProfile = catchAsync(
    async (req: Request<{}, {}, ProfileCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const profileData = await ProfileService.create(req.body, user.id);
      const profile = ProfileResponseSchema.parse(profileData);

      return ApiResponse.success(res, "User created.", profile);
    }
  );

  static updateProfile = catchAsync(
    async (req: Request<{}, {}, ProfileUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const profileData = await ProfileService.update(req.body, user.id);
      const profile = ProfileResponseSchema.parse(profileData);

      return ApiResponse.success(res, "User updated.", profile);
    }
  );
}
