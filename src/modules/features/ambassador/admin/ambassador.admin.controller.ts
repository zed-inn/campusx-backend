import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { AmbassadorGetFilterDto } from "./dtos/ambassador-get.admin.dto";
import { AmbassadorService } from "./ambassador.admin.service";
import { AmbassadorAggregator } from "./ambassador.admin.aggregator";
import { AmbassadorSchema } from "./dtos/ambassador-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { AmbassadorDeleteDto } from "./dtos/ambassador-action.admin.dto";
import { converTOrder } from "@shared/utils/convert-to-order";

export class AmbassadorController {
  static getAmbassodorsByFilters = catchAsync(
    async (req: Request<{}, {}, {}, AmbassadorGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order: converTOrder(order), filters };

      const iAmbassadors = await AmbassadorService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const tAmbassadors = await AmbassadorAggregator.transform(iAmbassadors);
      const pAmbassadors = tAmbassadors.map((a) => AmbassadorSchema.parse(a));

      return ApiResponse.success(res, "Ambassadors fetched.", {
        ambassadors: pAmbassadors,
      });
    }
  );

  static deleteAmbassador = catchAsync(
    async (req: Request<{}, {}, {}, AmbassadorDeleteDto>, res: Response) => {
      const q = req.query;

      await AmbassadorService.deleteByUserId(q.userId);

      return ApiResponse.success(res, "Ambassador deleted.");
    }
  );
}
