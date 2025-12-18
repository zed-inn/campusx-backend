import { AppError } from "@shared/errors/app-error";
import { Category } from "../models/category.model";

export class CategoryService {
  static CATEGORIES_PER_PAGE = 100;
  static OFFSET = (page: number) => (page - 1) * this.CATEGORIES_PER_PAGE;

  static getById = async (id: string) => {
    const category = await Category.findByPk(id);
    if (!category) throw new AppError("No Category Found.", 404);

    return category.get({ plain: true });
  };

  static getByName = async (name: string) => {
    const category = await Category.findOne({ where: { name } });
    if (!category) throw new AppError("No Category Found.", 404);

    return category.get({ plain: true });
  };

  static getAll = async (page: number) => {
    const categories = await Category.findAll({
      offset: this.OFFSET(page),
      limit: this.CATEGORIES_PER_PAGE,
      order: ["createDate", "desc"],
    });

    return categories.map((c) => c.get({ plain: true }));
  };

  static create = async (name: string) => {
    const category = await Category.create({ name });
    return category.get({ plain: true });
  };

  static update = async (id: string, name: string) => {
    const category = await Category.findByPk(id);
    if (!category) throw new AppError("No Category Found.", 404);

    await category.update({ name });
    return category.get({ plain: true });
  };

  static delete = async (id: string) => {
    const category = await Category.findByPk(id);
    if (!category) throw new AppError("No Category Found.", 404);

    const categoryData = category.get({ plain: true });

    await category.destroy();
    return categoryData;
  };
}
