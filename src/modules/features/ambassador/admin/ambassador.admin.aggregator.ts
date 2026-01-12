import { UserService } from "@modules/core/user";
import { AmbassadorAttributes } from "../../ambassador/ambassador.model";
import { AmbassadorSchema } from "./dtos/ambassador-response.admin.dto";

export type IncompleteAmbassador = AmbassadorAttributes & {
  user?: Record<string, unknown>;
};

export class AmbassadorAggregator {
  static addUser = async (ambassadors: IncompleteAmbassador[]) => {
    const userIds = ambassadors.map((r) => r.userId);

    const users = await UserService.getByIds(userIds);
    const userMap: Record<string, any> = users;
    users.map((u) => (userMap[u.id] = u));

    return ambassadors.map((r) => ({ ...r, user: userMap[r.userId] }));
  };

  static transform = async (ambassadors: IncompleteAmbassador[]) => {
    const withUser = await AmbassadorAggregator.addUser(ambassadors);

    return withUser.map((u) => AmbassadorSchema.parse(u));
  };
}
