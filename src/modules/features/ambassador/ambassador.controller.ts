import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { AmbassadorService } from "./ambassador.service";
import {
  ProfileResponseShort,
  ProfileService,
} from "@modules/core/profile";
import { ApiResponse } from "@shared/utils/api-response";
import {
  ResponseFullSchema,
  ResponseShortSchema,
} from "./dtos/ambassador-response.dto";
import { InstituteService } from "@modules/core/institutes";

export class AmbassadorController {
  static getInstituteAmbassadors = catchAsync(
    async (req: Request, res: Response) => {
      const q = s
        .create({ id: s.fields.id, page: s.fields.page })
        .parse(req.query);

      const services = await AmbassadorService.getByInstituteId(q.id, q.page);
      const users = await ProfileService.getByIds(
        services.map((s) => s.data.id)
      );
      const ambassadors = users.map((s) => ProfileResponseShort.parse(s));

      return ApiResponse.success(res, "Ambassadors.", { ambassadors });
    }
  );

  static getCurrentRequest = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const service = await AmbassadorService.getById(user.id);
    const institute = await InstituteService.getById(service.data.instituteId);
    const request = ResponseFullSchema.parse({
      ...service.data,
      institute: institute.data,
    });

    return ApiResponse.success(res, "Request Info.", { request });
  });

  static requestForAmbassadorPosition = catchAsync(
    async (req: Request, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = s
        .create({ reason: s.fields.stringNull, id: s.fields.id })
        .parse(req.body);

      const service = await AmbassadorService.create(
        { instituteId: q.id, reason: q.reason },
        user.id
      );
      const ambassador = ResponseShortSchema.parse(service.data);

      return ApiResponse.success(res, "Request Filed.", { ambassador });
    }
  );

  static updateRequest = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s
      .create({ reason: s.fields.stringNull, id: s.fields.id })
      .parse(req.body);

    const service = await AmbassadorService.update(
      { instituteId: q.id, reason: q.reason },
      user.id
    );
    const ambassador = ResponseShortSchema.parse(service.data);

    return ApiResponse.success(res, "Request Updated.", { ambassador });
  });

  static deleteRequest = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    await AmbassadorService.delete(user.id);

    return ApiResponse.success(res, "Request Withdrawn.");
  });
}
