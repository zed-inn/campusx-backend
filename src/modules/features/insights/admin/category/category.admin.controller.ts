import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import {
  CategoryCreateDto,
  CategoryDeleteDto,
  CategoryUpdateDto,
} from "./dtos/category-action.admin.dto";
import { CategoryService } from "./category.admin.service";
import { ApiResponse } from "@shared/utils/api-response";
import { CategoryGetFilterDto } from "./dtos/category-get.admin.dto";
import { converTOrder } from "@shared/utils/convert-to-order";

export class CategoryController {
  static getCategoriesByFilters = catchAsync(
    async (req: Request<{}, {}, {}, CategoryGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order: converTOrder(order), filters };

      const categories = await CategoryService.getByFilters(
        q.filters,
        q.order,
        q.page
      );

      return ApiResponse.success(res, "Categories fetched.", { categories });
    }
  );

  static createCategory = catchAsync(
    async (req: Request<{}, {}, CategoryCreateDto>, res: Response) => {
      const category = await CategoryService.createNew(req.body);

      return ApiResponse.success(res, "Category created.", { category });
    }
  );

  static updateCategory = catchAsync(
    async (req: Request<{}, {}, CategoryUpdateDto>, res: Response) => {
      const category = await CategoryService.update(req.body);

      return ApiResponse.success(res, "Category updated.", { category });
    }
  );

  static deleteCategory = catchAsync(
    async (req: Request<{}, {}, {}, CategoryDeleteDto>, res: Response) => {
      const q = req.query;

      const category = await CategoryService.deleteById(q.id);

      return ApiResponse.success(res, "Category deleted.", { id: category.id });
    }
  );
}
