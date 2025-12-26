import { Category } from "../models/category.model";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { InsightsErrors } from "../insights.errors";
import { CategorySchema } from "../dtos/service/category-schema.dto";

export class CategoryService extends BaseService<
  InstanceType<typeof Category>
> {
  static CATEGORIES_PER_PAGE = 100;
  static OFFSET = createOffsetFn(this.CATEGORIES_PER_PAGE);

  override get data() {
    const category = super.data;

    return CategorySchema.parse(category);
  }

  static getById = async (id: string) => {
    const category = await Category.findByPk(id);
    if (!category) throw InsightsErrors.noCategoryFound;

    return new CategoryService(category);
  };

  static getByName = async (name: string) => {
    const category = await Category.findOne({ where: { name } });
    if (!category) throw InsightsErrors.noCategoryFound;

    return new CategoryService(category);
  };

  static getAll = async (page: number) => {
    const categories = await Category.findAll({
      offset: this.OFFSET(page),
      limit: this.CATEGORIES_PER_PAGE,
      order: ["createDate", "desc"],
    });

    return categories.map((c) => new CategoryService(c));
  };

  static create = async (name: string) => {
    const category = await Category.create({ name });
    return new CategoryService(category);
  };

  static update = async (id: string, name: string) => {
    const service = await this.getById(id);

    const category = service.model;
    await category.update({ name });
    return new CategoryService(category);
  };

  static delete = async (id: string) => {
    const service = await this.getById(id);

    const category = service.model;
    await category.destroy();
    return new CategoryService(category);
  };
}
