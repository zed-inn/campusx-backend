import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { RequestService } from "./request.service";
import { RequestAggregator } from "./request.aggregator";
import { RequestSchema } from "./dtos/request-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import {
  RequestCreateDto,
  RequestDeleteDto,
  RequestUpdateDto,
} from "./dtos/request-action.dto";

export class RequestController {
  static getMyRequestStatus = catchAsync(
    async (req: Request, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iRequest = await RequestService.getByUserId(user.id);
      const [tRequest] = await RequestAggregator.transform([iRequest.plain]);
      const pRequest = RequestSchema.parse(tRequest);

      return ApiResponse.success(res, "Request Status.", { request: pRequest });
    }
  );

  static requestForPostition = catchAsync(
    async (req: Request<{}, {}, RequestCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iRequest = await RequestService.createNew(req.body, user.id);
      const [tRequest] = await RequestAggregator.transform([iRequest.plain]);
      const pRequest = RequestSchema.parse(tRequest);

      return ApiResponse.success(res, "Requested.", { request: pRequest });
    }
  );

  static updateRequest = catchAsync(
    async (req: Request<{}, {}, RequestUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iRequest = await RequestService.update(req.body, user.id);
      const [tRequest] = await RequestAggregator.transform([iRequest.plain]);
      const pRequest = RequestSchema.parse(tRequest);

      return ApiResponse.success(res, "Request updated.", {
        request: pRequest,
      });
    }
  );

  static withdrawRequest = catchAsync(
    async (req: Request<{}, {}, {}, RequestDeleteDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const request = await RequestService.deleteByOwnerById(q.id, user.id);

      return ApiResponse.success(res, "Requested.", { id: request.id });
    }
  );
}
