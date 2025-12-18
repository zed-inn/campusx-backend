import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { ApiResponse } from "@shared/utils/api-response";
import { CategoryService } from "./services/category.service";
import { InsightService } from "./services/insight.service";
import { INSIGHT_CONFIG } from "./insight.config";

export class InsightsController {
  static getCategories = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);

    const categories = await CategoryService.getAll(page);
    const parsedCategories = categories.map((c) => c.name);

    return ApiResponse.success(res, "Categories fetched.", {
      categories: parsedCategories,
    });
  });

  static getPublishedInsights = catchAsync(
    async (req: Request, res: Response) => {
      const page = Parse.pageNum(req.query.page);
      const categoryName = Parse.stringNullable(req.query.category);

      const insights = await InsightService.getByCategoryAndStatus(
        categoryName,
        INSIGHT_CONFIG.STATUS.PUBLISHED,
        page
      );

      return ApiResponse.success(res, "Insights fetched.", { insights });
    }
  );
}
