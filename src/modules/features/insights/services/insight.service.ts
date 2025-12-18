import { AppError } from "@shared/errors/app-error";
import { CategoryService } from "./category.service";
import { Insight } from "../models/insight.model";
import { INSIGHT_CONFIG } from "../insight.config";

export class InsightService {
  static INSIGHTS_PER_PAGE = 20;
  static OFFSET = (page: number) => (page - 1) * this.INSIGHTS_PER_PAGE;

  static getById = async (id: string) => {
    const insight = await Insight.findByPk(id);
    if (!insight) throw new AppError("No Insight Found.", 404);

    return insight.get({ plain: true });
  };

  static getByCategory = async (name: string, page: number) => {
    const category = await CategoryService.getByName(name);

    const insights = await Insight.findAll({
      where: { categoryId: category.id },
      offset: this.OFFSET(page),
      limit: this.INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return insights.map((i) => i.get({ plain: true }));
  };

  static getByStatus = async (status: string, page: number) => {
    if (!Object.values(INSIGHT_CONFIG.STATUS).includes(status))
      throw new AppError("Invalid Status", 400);

    const insights = await Insight.findAll({
      where: { status },
      offset: this.OFFSET(page),
      limit: this.INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return insights.map((i) => i.get({ plain: true }));
  };

  static getPublished = async (page: number) =>
    await this.getByStatus(INSIGHT_CONFIG.STATUS.PUBLISHED, page);

  static getByCategoryAndStatus = async (
    name: string | null,
    status: string | null,
    page: number
  ) => {
    if (status && !Object.values(INSIGHT_CONFIG.STATUS).includes(status))
      throw new AppError("Invalid Status", 400);

    const category = name ? await CategoryService.getByName(name) : null;

    const insights = await Insight.findAll({
      where: {
        ...(status ? { status } : {}),
        ...(category ? { categoryId: category.id } : {}),
      },
      offset: this.OFFSET(page),
      limit: this.INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return insights.map((i) => i.get({ plain: true }));
  };
}
