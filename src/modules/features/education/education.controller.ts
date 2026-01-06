import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { EducationService } from "./education.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import {
  EducationGetMineDto,
  EducationGetStudentsDto,
  EducationGetUserDto,
} from "./dtos/education-get.dto";
import { EducationAggregator } from "./education.aggregator";
import {
  EducationCreateResponseDto,
  EducationCreateResponseSchema,
  EducationDto,
  EducationSchema,
} from "./dtos/education-response.dto";
import {
  ProfileAggregator,
  ProfileService,
  ShortUserSchema,
} from "@modules/core/profile";
import {
  EducationCreateDto,
  EducationDeleteDto,
  EducationUpdateDto,
} from "./dtos/education-action.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

export class EducationController {
  static getUserEducation = catchAsync(
    async (req: Request<{}, {}, {}, EducationGetUserDto>, res: Response) => {
      const q = req.query;

      const iEducations = await EducationService.getByUserId(q.userId, q.page);
      const tEducations = await EducationAggregator.transform(iEducations);
      const pEducations = tEducations.map((e) => EducationSchema.parse(e));

      return ApiResponse.success(res, "User's education.", {
        educations: pEducations,
      });
    }
  );

  static getMyEducation = catchAsync(
    async (req: Request<{}, {}, {}, EducationGetMineDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iEducations = await EducationService.getByUserId(user.id, q.page);
      const tEducations = await EducationAggregator.transform(iEducations);
      const pEducations = tEducations.map((e) => EducationSchema.parse(e));

      return ApiResponse.success(res, "Your education.", {
        educations: pEducations,
      });
    }
  );

  static getInstituteStudents = catchAsync(
    async (
      req: Request<{}, {}, {}, EducationGetStudentsDto>,
      res: Response
    ) => {
      const q = req.query;

      const userIds = await EducationService.getUserIdsByInstituteId(
        q.instituteId,
        q.page
      );
      const iUsers = await ProfileService.getByIds(userIds);
      const tUsers = await ProfileAggregator.transform(iUsers, req.user?.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "Institute's students.", {
        students: pUsers,
      });
    }
  );

  static addEducation = catchAsync(
    async (req: Request<{}, {}, EducationCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.body;

      const responseData: EducationCreateResponseDto = {
        processed: [],
        unprocessed: [],
      };

      for (const edu of q.educations) {
        const { uniqueId, ...data } = edu;
        try {
          const iEducation = await EducationService.add(data, user.id);
          const [tEducation] = await EducationAggregator.transform([
            iEducation.plain,
          ]);
          const pEducation = EducationSchema.parse(tEducation);
          responseData.processed.push({ uniqueId, education: pEducation });
        } catch {
          responseData.unprocessed.push(uniqueId);
        }
      }

      const pResponseData = EducationCreateResponseSchema.parse(responseData);

      return ApiResponse.success(res, "Educations added.", pResponseData);
    }
  );

  static updateEducation = catchAsync(
    async (req: Request<{}, {}, EducationUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iEducation = await EducationService.update(req.body, user.id);
      const [tEducation] = await EducationAggregator.transform([
        iEducation.plain,
      ]);
      const pEducation = EducationSchema.parse(tEducation);

      return ApiResponse.success(res, "Education updated.", {
        education: pEducation,
      });
    }
  );

  static removeEducation = catchAsync(
    async (req: Request<{}, {}, {}, EducationDeleteDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const education = await EducationService.deleteByOwnerById(
        q.educationId,
        user.id
      );
      const responseData = GlobalDeleteSchema.parse(education);

      return ApiResponse.success(res, "Education removed.", responseData);
    }
  );
}
