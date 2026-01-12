import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ProfileGetFilterDto } from "./dtos/profile-get.admin.dto";
import { ProfileService } from "./profile.admin.service";
import { ProfileAggregator } from "./profile.admin.aggregator";
import { ProfileSchema } from "./dtos/profile-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class ProfileController {
  static getUsersByFilters = catchAsync(
    async (req: Request<{}, {}, {}, ProfileGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iProfiles = await ProfileService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const tProfiles = await ProfileAggregator.transform(iProfiles);
      const pProfiles = tProfiles.map((p) => ProfileSchema.parse(p));

      return ApiResponse.success(res, "Users fetched.", { users: pProfiles });
    }
  );
}
