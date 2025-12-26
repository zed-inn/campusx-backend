import { Profile } from "@modules/core/profile";
import { Includeable } from "sequelize";
import { Report } from "../models/report.model";
import { BaseService } from "@shared/services/base.service";
import { ReportSchema } from "../dtos/service/report-schema.dto";
import { ReportErrors } from "../errors/report.errors";

export class ReportService extends BaseService<InstanceType<typeof Report>> {
  override get data() {
    const report = super.data;
    return ReportSchema.parse(report);
  }

  static create = async (id: string, reason: string, userId: string) => {
    const r = await Report.create({ userId: id, reason, reportedBy: userId });

    return this.getById(r.dataValues.id);
  };

  static getById = async (id: string) => {
    const report = await Report.findByPk(id, { include: [ReportInclude.user] });
    if (!report) throw ReportErrors.noReportFound;

    return new ReportService(report);
  };
}

class ReportInclude {
  static get user(): Includeable {
    return { model: Profile, as: "user" };
  }
}
