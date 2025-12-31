import { Report, ReportAttributes, ReportInstance } from "./report.model";
import { BaseService } from "@shared/services/base.service";
import { ReportErrors } from "./report.errors";

export class ReportService extends BaseService<
  ReportInstance,
  ReportAttributes
> {
  static create = async (id: string, reason: string, reportedBy: string) => {
    const report = await Report.create({ userId: id, reason, reportedBy });

    return new ReportService(report);
  };

  static getById = async (id: string) => {
    const report = await Report.findByPk(id);
    if (!report) throw ReportErrors.noReportFound;

    return new ReportService(report);
  };
}
