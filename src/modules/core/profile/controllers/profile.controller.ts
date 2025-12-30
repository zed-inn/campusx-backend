import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { ProfileService } from "../services/profile.service";
import { ProfileCreateDto } from "../dtos/service/profile-create.dto";
import { ProfileUpdateDto } from "../dtos/service/profile-update.dto";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { s } from "@shared/utils/create-schema";
import {
  ProfileResponseMaxSchema as ResMax,
  ProfileResponseMinSchema as ResMin,
} from "../dtos/controller/profile-response.dto";

export class ProfileController {
  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ id: s.fields.id}).parse(req.query);

    const service = await ProfileService.getById(q.id, req.user?.id);
    const profile = ResMax.parse(service.data);

    return ApiResponse.success(res, "Profile fetched.", { profile });
  });

  static getUsers = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ page: s.fields.page}).parse(req.query);

    const services = await ProfileService.getAll(q.page, req.user?.id);
    const users = services.map((s) => ResMin.parse(s.data));

    return ApiResponse.success(res, "Users fetched.", { users });
  });

  static getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const service = await ProfileService.getById(user.id);
    const profile = ResMax.parse(service.data);

    return ApiResponse.success(res, "Profile fetched.", { profile });
  });

  static searchUsers = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    // const query = ]({name: })

    // TODO: search users endpoint
  });

  static createProfile = catchAsync(
    async (req: Request<{}, {}, ProfileCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ProfileService.create(req.body, user.id);
      const profile = ResMax.parse(service.data);

      return ApiResponse.success(res, "Profile created.", { profile });
    }
  );

  static updateProfile = catchAsync(
    async (req: Request<{}, {}, ProfileUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ProfileService.update(req.body, user.id);
      const profile = ResMax.parse(service.data);

      return ApiResponse.success(res, "Profile updated.", { profile });
    }
  );
}
