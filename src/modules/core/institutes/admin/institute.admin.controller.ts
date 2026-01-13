import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import {
  InstituteCreateDto,
  InstituteDeleteDto,
  InstituteUpdateDto,
} from "./dtos/institute-action.admin.dto";
import { InstituteService } from "./institute.admin.service";
import { ApiResponse } from "@shared/utils/api-response";
import { InstituteGetFilterDto } from "./dtos/institute-get.admin.dto";
import { converTOrder } from "@shared/utils/convert-to-order";

export class InstituteController {
  static createInstitute = catchAsync(
    async (req: Request<{}, {}, InstituteCreateDto>, res: Response) => {
      const institute = await InstituteService.createNew(req.body);

      return ApiResponse.success(res, "Institute created.", { institute });
    }
  );

  static getInstitutesByFilter = catchAsync(
    async (req: Request<{}, {}, {}, InstituteGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order: converTOrder(order), filters };

      const institutes = await InstituteService.getByFilter(
        q.filters,
        q.order,
        q.page
      );

      return ApiResponse.success(res, "Institutes fetched.", { institutes });
    }
  );

  static updateInstitute = catchAsync(
    async (req: Request<{}, {}, InstituteUpdateDto>, res: Response) => {
      const institute = await InstituteService.update(req.body);

      return ApiResponse.success(res, "Institute updated.", { institute });
    }
  );

  static deleteInstitute = catchAsync(
    async (req: Request<{}, {}, {}, InstituteDeleteDto>, res: Response) => {
      const q = req.query;

      const institute = await InstituteService.deleteById(q.id);

      return ApiResponse.success(res, "Institute deleted.", {
        id: institute.id,
      });
    }
  );
}
