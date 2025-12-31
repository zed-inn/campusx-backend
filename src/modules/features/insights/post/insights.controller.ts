import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { ApiResponse } from "@shared/utils/api-response";
import { CategoryService } from "../category/category.service";
import { InsightService } from "./insight.service";
import { InsightResponseSchema } from "./dtos/insight-response.dto";

export class InsightsController {
  static getCategories = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await CategoryService.getAll(q.page);
    const categories = services.map((s) => s.data.name);

    return ApiResponse.success(res, "Categories fetched.", { categories });
  });

  static getPublishedInsights = catchAsync(
    async (req: Request, res: Response) => {
      const q = s
        .create({ category: s.fields.stringNull, page: s.fields.page })
        .parse(req.query);

      const categories = q.category ? [q.category] : [];

      const services = await InsightService.getByCategories(categories, q.page);
      const insights = services.map((s) => InsightResponseSchema.parse(s.data));

      return ApiResponse.success(res, "Insights fetched.", { insights });
    }
  );
}
