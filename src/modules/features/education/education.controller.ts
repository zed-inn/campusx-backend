import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { EducationCreateDto } from "./dtos/education-create.dto";
import { s } from "@shared/utils/create-schema";
import { EducationService } from "./education.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { EducationUpdateDto } from "./dtos/education-update.dto";
import {
  InstituteAttributes,
  InstituteService,
} from "@modules/core/institutes";
import {
  ProfileResponseShort,
  ProfileService,
  ProfileUtils,
} from "@modules/core/user-profile";
import {
  ResponseFullSchema,
  ResponseShortSchema,
} from "./dtos/education-response.dto";

export class EducationController {
  static getUserEducation = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ id: s.fields.id, page: s.fields.page })
      .parse(req.query);

    const services = await EducationService.getByUserId(q.id, q.page);
    const instituteIds = services.map((s) => s.data.instituteId);
    const institutes: Record<string, InstituteAttributes> = {};
    const instuteService = await InstituteService.getByIds(instituteIds);
    instuteService.map((s) => (institutes[s.data.id] = s.data));

    const educations = services.map((s) =>
      ResponseFullSchema.parse({
        ...s,
        institute: institutes[s.data.instituteId],
      })
    );

    return ApiResponse.success(res, "User's education.", { educations });
  });

  static getInstituteStudents = catchAsync(
    async (req: Request, res: Response) => {
      const q = s
        .create({ id: s.fields.id, page: s.fields.page })
        .parse(req.query);

      const services = await EducationService.getByInstituteId(q.id, q.page);
      const userIds = services.map((s) => s.data.userId);
      const users = await ProfileService.getByIds(userIds);
      const joined = await ProfileUtils.joinIsFollowed(
        users.map((u) => u.data),
        req.user?.id
      );

      const students = joined.map((s) => ProfileResponseShort.parse(s));

      return ApiResponse.success(res, "Institute's students.", { students });
    }
  );

  static addEducation = catchAsync(
    async (req: Request<{}, {}, EducationCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await EducationService.create(req.body, user.id);
      const education = ResponseShortSchema.parse(service.data);

      return ApiResponse.success(res, "Education added.", { education });
    }
  );

  static updateEducation = catchAsync(
    async (req: Request<{}, {}, EducationUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await EducationService.update(req.body, user.id);
      const education = ResponseShortSchema.parse(service.data);

      return ApiResponse.success(res, "Education updated.", { education });
    }
  );

  static removeEducation = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    const service = await EducationService.delete(q.id, user.id);
    const education = ResponseShortSchema.parse(service.data);

    return ApiResponse.success(res, "Education removed.", { education });
  });
}
