import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { ProfileService } from "../services/profile.service";
import { ProfileCreateDto } from "../dtos/profile-create.dto";
import { ProfileUpdateDto } from "../dtos/profile-update.dto";
import { ProfileResponseSchema } from "../dtos/profile-response.dto";
import { z } from "zod";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { Parse } from "@shared/utils/parse-fields";

export class ProfileController {
  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const id = z.uuidv4().parse(req.query.id);

    const profileData = await ProfileService.getById(id, req.user?.id);
    const profile = ProfileResponseSchema.parse(profileData);

    return ApiResponse.success(res, "User found.", { profile });
  });

  static getUserProfiles = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.pageNum);

    const profiles = await ProfileService.getAll(page, req.user?.id);
    const parsedProfiles = profiles.map((p) => ProfileResponseSchema.parse(p));

    return ApiResponse.success(res, "User found.", { users: parsedProfiles });
  });

  static getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const profileData = await ProfileService.getById(user.id, user.id);
    const profile = ProfileResponseSchema.parse(profileData);

    return ApiResponse.success(res, "User found.", { profile });
  });

  static createProfile = catchAsync(
    async (req: Request<{}, {}, ProfileCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const profileData = await ProfileService.create(req.body, user.id);
      const profile = ProfileResponseSchema.parse(profileData);

      return ApiResponse.success(res, "User created.", { profile });
    }
  );

  static updateProfile = catchAsync(
    async (req: Request<{}, {}, ProfileUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const profileData = await ProfileService.update(req.body, user.id);
      const profile = ProfileResponseSchema.parse(profileData);

      return ApiResponse.success(res, "User updated.", { profile });
    }
  );
}
