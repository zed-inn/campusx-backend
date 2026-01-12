import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { RequestGetFilterDto } from "./dtos/request-get.admin.dto";
import { RequestService } from "./request.admin.service";
import { ApiResponse } from "@shared/utils/api-response";
import { RequestAggregator } from "./request.admin.aggregator";
import { RequestSchema } from "./dtos/request-response.admin.dto";
import { RequestUpdateDto } from "./dtos/request-action.admin.dto";

export class RequestController {
  static getRequestsByFilter = catchAsync(
    async (req: Request<{}, {}, {}, RequestGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iRequests = await RequestService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const tRequests = await RequestAggregator.transform(iRequests);
      const pRequests = tRequests.map((r) => RequestSchema.parse(r));

      return ApiResponse.success(res, "Requests fetched.", {
        requests: pRequests,
      });
    }
  );

  static updateRequest = catchAsync(
    async (req: Request<{}, {}, RequestUpdateDto>, res: Response) => {
      const iRequest = await RequestService.update(req.body);
      const [tRequest] = await RequestAggregator.transform([iRequest.plain]);
      const pRequest = RequestSchema.parse(tRequest);

      return ApiResponse.success(res, "Request updated.", {
        request: pRequest,
      });
    }
  );
}
