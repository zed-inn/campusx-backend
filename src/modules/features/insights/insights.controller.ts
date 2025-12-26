import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { createSchema } from "@shared/utils/create-schema";
import { ApiResponse } from "@shared/utils/api-response";
import { CategoryService } from "./services/category.service";
import { InsightService } from "./services/insight.service";
import { INSIGHT_CONFIG } from "./insight.config";
import { InsightResponseSchema } from "./dtos/controller/insight-response.dto";

export class InsightsController {
  static getCategories = catchAsync(async (req: Request, res: Response) => {
    const q = createSchema({ page: "page" }).parse(req.query);

    const services = await CategoryService.getAll(q.page);
    const categories = services.map((s) => s.data.name);

    return ApiResponse.success(res, "Categories fetched.", { categories });
  });

  static getPublishedInsights = catchAsync(
    async (req: Request, res: Response) => {
      const q = createSchema({ page: "page", category: "stringNull" }).parse(
        req.query
      );

      const services = await InsightService.getByCatAndStatus(
        q.category,
        INSIGHT_CONFIG.STATUS.PUBLISHED,
        q.page
      );
      const insights = services.map((s) => InsightResponseSchema.parse(s.data));

      return ApiResponse.success(res, "Insights fetched.", { insights });
    }
  );
}
