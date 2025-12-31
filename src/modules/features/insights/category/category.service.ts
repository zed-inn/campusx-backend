import {
  Category,
  CategoryAttributes,
  CategoryInstance,
} from "./category.model";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { InsightsErrors } from "../insights.errors";
import { CATEGORIES_PER_PAGE } from "@config/constants/items-per-page";

export class CategoryService extends BaseService<
  CategoryInstance,
  CategoryAttributes
> {
  static OFFSET = createOffsetFn(CATEGORIES_PER_PAGE);

  static getById = async (id: string) => {
    const category = await Category.findByPk(id);
    if (!category) throw InsightsErrors.noCategoryFound;

    return new CategoryService(category);
  };

  static getByNames = async (names: string[]) => {
    const categories = await Category.findAll({ where: { name: names } });

    return categories.map((c) => new CategoryService(c));
  };

  static getAll = async (page: number) => {
    const categories = await Category.findAll({
      offset: this.OFFSET(page),
      limit: CATEGORIES_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return categories.map((c) => new CategoryService(c));
  };
}
