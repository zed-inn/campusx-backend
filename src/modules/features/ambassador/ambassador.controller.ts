import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { createSchema } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { AmbassadorService } from "./ambassador.service";
import { ProfileResMin } from "@modules/core/profile";
import { ApiResponse } from "@shared/utils/api-response";

export class AmbassadorController {
  static getInstituteAmbassadors = catchAsync(
    async (req: Request, res: Response) => {
      const q = createSchema({ id: "id", page: "page" }).parse(req.query);

      const services = await AmbassadorService.getByInstituteId(
        q.id,
        q.page,
        req.user?.id
      );
      const ambassadors = services.map((s) => ProfileResMin.parse(s.data.user));

      return ApiResponse.success(res, "Ambassadors.", { ambassadors });
    }
  );

  static requestForAmbassadorPosition = catchAsync(
    async (req: Request, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = createSchema({ reason: "stringNull", id: "id" }).parse(
        req.body
      );

      await AmbassadorService.create(
        { instituteId: q.id, reasonToBecome: q.reason },
        user.id
      );

      return ApiResponse.success(res, "Request Filled.");
    }
  );

  static updateRequest = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ reason: "stringNull", id: "id" }).parse(req.body);

    await AmbassadorService.update(
      { instituteId: q.id, reasonToBecome: q.reason },
      user.id
    );

    return ApiResponse.success(res, "Request Updated.");
  });

  static deleteRequest = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    await AmbassadorService.delete(user.id);

    return ApiResponse.success(res, "Request Withdrawn.");
  });
}
