import { Report, ReportInstance } from "./report.model";
import { BaseService } from "@shared/services/base.service";

class _ReportService extends BaseService<ReportInstance> {
  constructor() {
    super(Report);
  }
}

export const ReportService = new _ReportService();
