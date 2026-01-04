import { BaseService } from "@shared/services/base.service";
import { ReportCreateDto } from "./dtos/report-create.dto";
import { Report, ReportInstance } from "./report.model";

class _ReportService extends BaseService<ReportInstance> {
  constructor() {
    super(Report);
  }

  createNew = async (data: ReportCreateDto, reportedBy: string) => {
    return await this.create({ ...data, reportedBy });
  };
}

export const ReportService = new _ReportService();
