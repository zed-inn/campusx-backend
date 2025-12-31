import {
  Report,
  ReportAttributes,
  ReportInstance,
} from "../report/report.model";
import { BaseService } from "@shared/services/base.service";

export class ReportService extends BaseService<
  ReportInstance,
  ReportAttributes
> {
  static create = async (id: string, reason: string, userId: string) => {
    await Report.create({ forumId: id, reason, userId });
  };
}
