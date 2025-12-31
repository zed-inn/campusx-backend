import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { ProfileService } from "./profile.service";
import { ApiResponse } from "@shared/utils/api-response";
import { ResponseFullSchema } from "./dtos/profile-response.dto";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { CreateFullDto } from "./dtos/profile-create.dto";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { ProfileUtils } from "./profile.utils";

export class ProfileController {
  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ id: s.fields.id }).parse(req.query);

    const service = await ProfileService.getById(q.id);
    const [joined] = await ProfileUtils.joinAll([service.data], req.user?.id);
    const profile = ResponseFullSchema.parse(joined);

    return ApiResponse.success(res, "Profile fetched.", { profile });
  });

  static getUsers = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await ProfileService.getAll(q.page);
    const joined = await ProfileUtils.joinAll(
      services.map((s) => s.data),
      req.user?.id
    );
    const users = joined.map((j) => ResponseFullSchema.parse(j));

    return ApiResponse.success(res, "Users fetched.", { users });
  });

  static getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const service = await ProfileService.getById(user.id);
    const profile = ResponseFullSchema.parse(service.data);

    return ApiResponse.success(res, "Profile fetched.", { profile });
  });

  static searchUsers = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    // TODO: search users endpoint
  });

  static createProfile = catchAsync(
    async (req: Request<{}, {}, CreateFullDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ProfileService.create(req.body, user.id);
      const profile = ResponseFullSchema.parse(service.data);

      return ApiResponse.success(res, "Profile created.", { profile });
    }
  );

  static updateProfile = catchAsync(
    async (req: Request<{}, {}, ProfileUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ProfileService.update(req.body, user.id);
      const profile = ResponseFullSchema.parse(service.data);

      return ApiResponse.success(res, "Profile updated.", { profile });
    }
  );
}
