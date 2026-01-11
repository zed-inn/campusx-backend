import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { CATEGORIES_PER_PAGE } from "@config/constants/items-per-page";
import {
  Category,
  CategoryAttributes,
  CategoryInstance,
} from "../../category/category.model";
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from "./dtos/category-action.admin.dto";
import { CategoryFiltersDto } from "./dtos/category-get.admin.dto";
import { OrderItem } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _CategoryService extends BaseService<CategoryInstance> {
  protected OFFSET = createOffsetFn(CATEGORIES_PER_PAGE);

  constructor() {
    super(Category);
  }

  createNew = async (data: CategoryCreateDto) => {
    return await this.create(data);
  };

  getByFilters = async (
    filters: CategoryFiltersDto,
    order: string[][],
    page: number
  ) => {
    const categories = await Category.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: CATEGORIES_PER_PAGE,
      order: order as OrderItem[],
    });

    return categories.map((c) => c.plain);
  };

  update = async (data: CategoryUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const category = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await category.update(cleanData as Partial<CategoryAttributes>);

      return category;
    });
  };
}

export const CategoryService = new _CategoryService();
