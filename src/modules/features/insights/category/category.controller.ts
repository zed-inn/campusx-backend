import { ApiResponse } from "@shared/utils/api-response";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryGetPageDto } from "./dtos/category-get.dto";

export class CategoryController {
  static getCategories = catchAsync(
    async (req: Request<{}, {}, {}, CategoryGetPageDto>, res: Response) => {
      const q = req.query;

      const categories = await CategoryService.getByPage(q.page);
      const categorNames = categories.map((c) => c.name);

      return ApiResponse.success(res, "Categories fetched.", {
        categories: categorNames,
      });
    }
  );
}
