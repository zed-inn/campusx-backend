import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { ApiResponse } from "@shared/utils/api-response";
import { InstituteService } from "./institute.service";
import {
  ResponseFullSchema,
  ResponseSmallSchema,
} from "./dtos/institute-response.dto";

export class InstituteController {
  static getInstitute = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ id: s.fields.id }).parse(req.query);

    const service = await InstituteService.getById(q.id);
    const institute = ResponseFullSchema.parse(service.data);

    return ApiResponse.success(res, "Institute fetched.", { institute });
  });

  static getAllInstitutes = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await InstituteService.getAll(q.page);
    const institutes = services.map((i) => ResponseSmallSchema.parse(i.data));

    return ApiResponse.success(res, "Institutes fetched.", { institutes });
  });

  static getAllInstitutesRandom = catchAsync(
    async (req: Request, res: Response) => {
      const services = await InstituteService.getRandom();
      const institutes = services.map((i) => ResponseSmallSchema.parse(i.data));

      return ApiResponse.success(res, "Institutes fetched.", { institutes });
    }
  );
}
