import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { AmbassadorService } from "./ambassador.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AmbassadorGetInstituteDto } from "./dtos/ambassador-get.dto";
import {
  ProfileAggregator,
  ProfileService,
  ShortUserSchema,
} from "@modules/core/profile";

export class AmbassadorController {
  static getInstituteAmbassadors = catchAsync(
    async (
      req: Request<{}, {}, {}, AmbassadorGetInstituteDto>,
      res: Response
    ) => {
      const q = req.query;

      const ambassadors = await AmbassadorService.getByInstituteId(
        q.instituteId,
        q.page
      );
      const userIds = ambassadors.map((a) => a.userId);

      const iUsers = await ProfileService.getByIds(userIds);
      const tUsers = await ProfileAggregator.transform(iUsers, req.user?.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "Ambassadors.", { ambassadors: pUsers });
    }
  );
}
