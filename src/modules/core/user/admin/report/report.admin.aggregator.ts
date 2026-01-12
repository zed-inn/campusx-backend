import { ReportAttributes } from "../../report/report.model";
import { UserService } from "../../user.service";
import { ReportSchema } from "./dtos/report-response.admin.dto";

export type IncompleteReport = ReportAttributes & {
  user?: Record<string, unknown>;
};

export class ReportAggregator {
  static addUser = async (reports: IncompleteReport[]) => {
    const userIds = reports.map((r) => r.userId);

    const users = await UserService.getByIds(userIds);
    const userMap: Record<string, any> = {};
    users.map((u) => (userMap[u.id] = u));

    return reports.map((r) => ({ ...r, user: userMap[r.userId] }));
  };

  static transform = async (reports: IncompleteReport[]) => {
    const withUser = await ReportAggregator.addUser(reports);

    return withUser.map((r) => ReportSchema.parse(r));
  };
}
