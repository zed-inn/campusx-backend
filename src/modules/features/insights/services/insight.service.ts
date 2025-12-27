import { CategoryService } from "./category.service";
import { Insight, InsightInstance } from "../models/insight.model";
import { INSIGHT_CONFIG } from "../insight.config";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { InsightsErrors } from "../insights.errors";
import { InsightSchema } from "../dtos/service/insight-schema.dto";
import { Includeable } from "sequelize";
import { Category } from "../models/category.model";
import { Rui } from "@shared/dtos/req-user.dto";

export class InsightService extends BaseService<InsightInstance> {
  static INSIGHTS_PER_PAGE = 20;
  static OFFSET = createOffsetFn(this.INSIGHTS_PER_PAGE);

  override get data() {
    const insight = super.data;

    return InsightSchema.parse(insight);
  }

  static getById = async (id: string) => {
    const insight = await Insight.findByPk(id, {
      include: [InsightInclude.category],
    });
    if (!insight) throw InsightsErrors.noInsightFound;

    return new InsightService(insight);
  };

  static getByCategory = async (name: string, page: number) => {
    const service = await CategoryService.getByName(name);

    const insights = await Insight.findAll({
      where: { categoryId: service.data.id },
      offset: this.OFFSET(page),
      limit: this.INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [InsightInclude.category],
    });

    return insights.map((i) => new InsightService(i));
  };

  static getByStatus = async (status: string, page: number) => {
    InsightUtils.checkStatus(status);

    const insights = await Insight.findAll({
      where: { status },
      offset: this.OFFSET(page),
      limit: this.INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [InsightInclude.category],
    });

    return insights.map((i) => new InsightService(i));
  };

  static getPublished = async (page: number) =>
    await this.getByStatus(INSIGHT_CONFIG.STATUS.PUBLISHED, page);

  static getByCatAndStatus = async (name: Rui, status: Rui, page: number) => {
    InsightUtils.checkStatus(status);

    const service = name ? await CategoryService.getByName(name) : null;

    const insights = await Insight.findAll({
      where: {
        ...(status ? { status } : {}),
        ...(service ? { categoryId: service.data.id } : {}),
      },
      offset: this.OFFSET(page),
      limit: this.INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [InsightInclude.category],
    });

    return insights.map((i) => new InsightService(i));
  };
}

class InsightInclude {
  static get category(): Includeable {
    return {
      model: Category,
      as: "category",
    };
  }
}

class InsightUtils {
  static checkStatus = (status: any) => {
    if (status && !Object.values(INSIGHT_CONFIG.STATUS).includes(status))
      throw InsightsErrors.invalidStatus;
  };
}
