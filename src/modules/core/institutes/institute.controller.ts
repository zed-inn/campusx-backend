import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { ApiResponse } from "@shared/utils/api-response";
import { InstituteService } from "./institute.service";
import { InstituteResponseSchema } from "./dtos/institute-response.dto";

export class InstituteController {
  static getInstitute = catchAsync(async (req: Request, res: Response) => {
    const id = Parse.id(req.query.id);

    const institute = await InstituteService.getById(id);
    const parsedInstitute = InstituteResponseSchema.parse(institute);

    return ApiResponse.success(res, "Institute fetched.", {
      institute: parsedInstitute,
    });
  });

  static getAllInstitutes = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);

    const institutes = await InstituteService.getAll(page);
    const parsedInstitutes = institutes.map((i) =>
      InstituteResponseSchema.parse(i)
    );

    return ApiResponse.success(res, "Institute fetched.", {
      institutes: parsedInstitutes,
    });
  });

  static getAllInstitutesRandom = catchAsync(
    async (req: Request, res: Response) => {
      const institutes = await InstituteService.getRandom();
      const parsedInstitutes = institutes.map((i) =>
        InstituteResponseSchema.parse(i)
      );

      return ApiResponse.success(res, "Institute fetched.", {
        institutes: parsedInstitutes,
      });
    }
  );
}
