import { CategoryService } from "../category/category.service";
import {
  Insight,
  InsightAttributes,
  InsightInstance,
} from "./insight.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { InsightsErrors } from "../insights.errors";
import { Includeable } from "sequelize";
import { Category, CategoryAttributes } from "../category/category.model";
import { INSIGHTS_PER_PAGE } from "@config/constants/items-per-page";
import { STATUS } from "./insight.constants";

export class InsightService extends BaseService<
  InsightInstance,
  InsightAttributes
> {
  override get data() {
    return super.data as InsightAttributes & { category: CategoryAttributes };
  }

  static OFFSET = createOffsetFn(INSIGHTS_PER_PAGE);

  static getById = async (id: string) => {
    const insight = await Insight.findByPk(id, {
      include: [InsightInclude.category],
    });
    if (!insight) throw InsightsErrors.noInsightFound;

    return new InsightService(insight);
  };

  static getByCategories = async (names: string[], page: number) => {
    const services = await CategoryService.getByNames(names);
    const categoryIds = services.map((s) => s.data.id);

    const insights = await Insight.findAll({
      where: { categoryId: categoryIds, status: STATUS.Published },
      offset: this.OFFSET(page),
      limit: INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [InsightInclude.category],
    });

    return insights.map((i) => new InsightService(i));
  };
}

class InsightInclude {
  static get category(): Includeable {
    return { model: Category, as: "category" };
  }
}
