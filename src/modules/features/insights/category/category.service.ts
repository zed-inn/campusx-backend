import { Category, CategoryInstance } from "./category.model";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { CATEGORIES_PER_PAGE } from "@config/constants/items-per-page";

class _CategoryService extends BaseService<CategoryInstance> {
  protected OFFSET = createOffsetFn(CATEGORIES_PER_PAGE);

  constructor() {
    super(Category);
  }

  getByNames = async (names: string[]) => {
    const categories = await Category.findAll({ where: { name: names } });

    return categories.map((c) => c.plain);
  };

  getByPage = async (page: number) => {
    const categories = await Category.findAll({
      offset: this.OFFSET(page),
      limit: CATEGORIES_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return categories.map((c) => c.plain);
  };
}

export const CategoryService = new _CategoryService();
