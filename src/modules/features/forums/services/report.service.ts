import { Profile, ProfileService } from "@modules/core/profile";
import { Includeable } from "sequelize";
import { Report } from "../models/report.model";
import { BaseService } from "@shared/services/base.service";
import { ReportSchema } from "../dtos/service/report-schema.dto";
import { Rui } from "@shared/dtos/req-user.dto";
import { ReportErrors } from "../errors/report.errors";

export class ReportService extends BaseService<InstanceType<typeof Report>> {
  override get data() {
    const report = super.data;
    report.user = ProfileService.parse(report.user);

    return ReportSchema.parse(report);
  }

  static create = async (id: string, reason: string, userId: string) => {
    const r = await Report.create({ forumId: id, reason, userId });

    return this.getById(r.dataValues.id);
  };

  static getById = async (id: string, reqUserId?: Rui) => {
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
