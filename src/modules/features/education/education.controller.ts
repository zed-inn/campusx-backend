import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { EducationCreateDto } from "./dtos/service/education-create.dto";
import { createSchema } from "@shared/utils/create-schema";
import { EducationService } from "./education.service";
import { EducationResponseSchema } from "./dtos/controller/education-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ProfileResponseMinSchema as ResMinProfile } from "@modules/core/profile/dtos/controller/profile-response.dto";
import { EducationUpdateDto } from "./dtos/service/education-update.dto";

export class EducationController {
  static getUserEducation = catchAsync(async (req: Request, res: Response) => {
    const q = createSchema({ id: "id", page: "page" }).parse(req.query);

    const services = await EducationService.getByUserId(
      q.id,
      q.page,
      req.user?.id
    );
    const educations = services.map((s) =>
      EducationResponseSchema.parse(s.data)
    );

    return ApiResponse.success(res, "User's education.", { educations });
  });

  static getInstituteStudents = catchAsync(
    async (req: Request, res: Response) => {
      const q = createSchema({ id: "id", page: "page" }).parse(req.query);

      const services = await EducationService.getByInstituteId(
        q.id,
        q.page,
        req.user?.id
      );

      const studentsList = services.map((s) => s.data.user);
      const temp: string[] = [];
      const students = studentsList
        .filter((s) => {
          if (temp.includes(s.id)) return false;
          temp.push(s.id);
          return true;
        })
        .map((s) => ResMinProfile.parse(s));

      return ApiResponse.success(res, "Institute's students.", { students });
    }
  );

  static addEducation = catchAsync(
    async (req: Request<{}, {}, EducationCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await EducationService.create(req.body, user.id);
      const education = EducationResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Education added.", { education });
    }
  );

  static updateEducation = catchAsync(
    async (req: Request<{}, {}, EducationUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await EducationService.update(req.body, user.id);
      const education = EducationResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Education updated.", { education });
    }
  );

  static removeEducation = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.query);

    const service = await EducationService.delete(q.id, user.id);
    const education = EducationResponseSchema.parse(service.data);

    return ApiResponse.success(res, "Education removed.", { education });
  });
}
