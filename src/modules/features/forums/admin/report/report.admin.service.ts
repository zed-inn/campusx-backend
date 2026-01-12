import { REPORTS_PER_PAGE } from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import {
  Report,
  ReportAttributes,
  ReportInstance,
} from "../../report/report.model";
import { ReportFiltersDto } from "./dtos/report-get.admin.dto";
import { OrderItem } from "sequelize";
import { ReportUpdateDto } from "./dtos/report-action.admin.dto";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _ReportService extends BaseService<ReportInstance> {
  protected OFFSET = createOffsetFn(REPORTS_PER_PAGE);

  constructor() {
    super(Report);
  }

  getByFilters = async (
    filters: ReportFiltersDto,
    order: string[][],
    page: number
  ) => {
    const reports = await Report.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: REPORTS_PER_PAGE,
      order: order as OrderItem[],
    });

    return reports.map((r) => r.plain);
  };

  update = async (data: ReportUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const report = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await report.update(cleanData as Partial<ReportAttributes>);

      return report;
    });
  };
}

export const ReportService = new _ReportService();
