import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import {
  ProfileCheckUsernameDto,
  ProfileGetDto,
  ProfileGetUsersDto,
} from "./dtos/profile-get.dto";
import { ProfileService } from "./profile.service";
import { ProfileAggregator } from "./profile.aggregator";
import { ShortUserSchema, UserSchema } from "./dtos/profile-response.dto";
import { ProfileCreateDto } from "./dtos/profile-create.dto";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { AppError } from "@shared/errors/app-error";

export class ProfileController {
  static getProfile = catchAsync(
    async (req: Request<{}, {}, {}, ProfileGetDto>, res: Response) => {
      const q = req.query;

      const iUser = await ProfileService.getById(q.userId);
      const [tUser] = await ProfileAggregator.transform(
        [iUser.plain],
        req.user?.id
      );
      const pUser = UserSchema.parse(tUser);

      return ApiResponse.success(res, "Profile fetched.", { user: pUser });
    }
  );

  static getUsers = catchAsync(
    async (req: Request<{}, {}, {}, ProfileGetUsersDto>, res: Response) => {
      // TODO: not hidden the requesting user

      const iUsers = await ProfileService.filterUsersByName(req.query);
      const tUsers = await ProfileAggregator.transform(iUsers, req.user?.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "Users fetched.", { users: pUsers });
    }
  );

  static getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const iUser = await ProfileService.getById(user.id);
    const [tUser] = await ProfileAggregator.transform([iUser.plain]);
    const pUser = UserSchema.parse(tUser);

    return ApiResponse.success(res, "Profile fetched.", { user: pUser });
  });

  static createProfile = catchAsync(
    async (req: Request<{}, {}, ProfileCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iUser = await ProfileService.createStudent(req.body, user.id);
      const [tUser] = await ProfileAggregator.transform([iUser.plain]);
      const pUser = UserSchema.parse(tUser);

      return ApiResponse.success(res, "Profile created.", { user: pUser });
    }
  );

  static updateProfile = catchAsync(
    async (req: Request<{}, {}, ProfileUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iUser = await ProfileService.update(req.body, user.id);
      const [tUser] = await ProfileAggregator.transform([iUser.plain]);
      const pUser = UserSchema.parse(tUser);

      return ApiResponse.success(res, "Profile updated.", { user: pUser });
    }
  );

  static checkUsername = catchAsync(
    async (
      req: Request<{}, {}, {}, ProfileCheckUsernameDto>,
      res: Response
    ) => {
      const q = req.query;
      if (!q.username) throw new AppError("No username provided", 400);

      try {
        await ProfileService.getByUsername(q.username);
        throw new AppError("Username unavailable", 400);
      } catch {}

      return ApiResponse.success(res, "Username available.");
    }
  );
}
