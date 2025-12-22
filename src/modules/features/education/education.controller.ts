import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { EducationCreateDto } from "./dtos/education-create.dto";
import { EducationUpdateDto } from "./dtos/education-update.dto";
import { Parse } from "@shared/utils/parse-fields";
import { EducationService } from "./education.service";
import { EducationResponseSchema } from "./dtos/education-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";

export class EducationController {
  static getUserEducation = catchAsync(async (req: Request, res: Response) => {
    const id = Parse.id(req.query.userId);
    const page = Parse.pageNum(req.query.page);

    const educations = await EducationService.getByUserId(
      id,
      page,
      req.user?.id
    );
    const parsedEducations = educations.map((e) =>
      EducationResponseSchema.parse(e)
    );

    return ApiResponse.success(res, "User's education", {
      educations: parsedEducations,
    });
  });

  static getInstituteStudents = catchAsync(
    async (req: Request, res: Response) => {
      const id = Parse.id(req.query.instituteId);
      const page = Parse.pageNum(req.query.page);

      const educations = await EducationService.getByInstituteId(
        id,
        page,
        req.user?.id
      );

      const studentsId: string[] = [];
      const students = educations
        .filter((e) => {
          if (!studentsId.includes(e.user.id)) {
            studentsId.push(e.user.id);
            return true;
          }
          return false;
        })
        .map((s) => EducationResponseSchema.shape.user.parse(s.user));

      return ApiResponse.success(res, "Institute's atudents", { students });
    }
  );

  static addEducation = catchAsync(
    async (req: Request<{}, {}, EducationCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const education = await EducationService.create(req.body, user.id);
      const parsedEducation = EducationResponseSchema.parse(education);

      return ApiResponse.success(res, "Education added.", {
        education: parsedEducation,
      });
    }
  );

  static updateEducation = catchAsync(
    async (req: Request<{}, {}, EducationUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const education = await EducationService.update(req.body, user.id);
      const parsedEducation = EducationResponseSchema.parse(education);

      return ApiResponse.success(res, "Education updated.", {
        education: parsedEducation,
      });
    }
  );

  static removeEducation = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.query.id);

    const education = await EducationService.delete(id, user.id);
    const parsedEducation = EducationResponseSchema.parse(education);

    return ApiResponse.success(res, "Education removed.", {
      education: parsedEducation,
    });
  });
}
