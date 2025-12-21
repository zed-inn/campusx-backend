import { Profile, ProfileService } from "@modules/core/profile";
import { Includeable } from "sequelize";
import { Report } from "../models/report.model";
import { ReportFullSchema as ReportFS } from "../dtos/report-full.dto";

export class ReportService {
  static report = async (id: string, reason: string, userId: string) => {
    const report = await Report.create({ forumId: id, reason, userId });
    const user = await ProfileService.getById(userId);

    return ReportFS.parse({ ...report.get({ plain: true }), user });
  };
}

class ReportInclude {
  static get profile(): Includeable {
    return { model: Profile, as: "user" };
  }
}
