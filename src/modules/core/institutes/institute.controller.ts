import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { InstituteService } from "./institute.service";
import {
  InstituteGetOneDto,
  InstituteGetPageDto,
} from "./dtos/institute-get.dto";
import {
  InstituteSchema,
  ShortInstituteSchema,
} from "./dtos/institute-response.dto";

export class InstituteController {
  static getInstitute = catchAsync(
    async (req: Request<{}, {}, {}, InstituteGetOneDto>, res: Response) => {
      const q = req.query;

      const institute = await InstituteService.getById(q.instituteId);
      const pInstitute = InstituteSchema.parse(institute.plain);

      return ApiResponse.success(res, "Institute fetched.", {
        institute: pInstitute,
      });
    }
  );

  static getFilteredInstitutes = catchAsync(
    async (req: Request<{}, {}, {}, InstituteGetPageDto>, res: Response) => {
      const institutes = await InstituteService.filterByPage(req.query);
      const pInstitutes = institutes.map((i) => ShortInstituteSchema.parse(i));

      return ApiResponse.success(res, "Institutes fetched.", {
        institutes: pInstitutes,
      });
    }
  );

  static getCountryStateMap = catchAsync(
    async (req: Request, res: Response) => {
      const countryStateMap = await InstituteService.getTwoFieldMap(
        "country",
        "state"
      );

      return ApiResponse.success(res, "States fetched.", {
        states: countryStateMap,
      });
    }
  );

  static getStateDistrictMap = catchAsync(
    async (req: Request, res: Response) => {
      const stateDistrictMap = await InstituteService.getTwoFieldMap(
        "state",
        "district"
      );

      return ApiResponse.success(res, "Districts fetched.", {
        districts: stateDistrictMap,
      });
    }
  );
}
