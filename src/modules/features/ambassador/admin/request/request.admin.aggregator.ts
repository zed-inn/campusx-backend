import { UserService } from "@modules/core/user";
import { RequestAttributes } from "../../request/request.model";
import { RequestSchema } from "./dtos/request-response.admin.dto";

export type IncompleteRequest = RequestAttributes & {
  user?: Record<string, unknown>;
};

export class RequestAggregator {
  static addUser = async (requests: IncompleteRequest[]) => {
    const userIds = requests.map((r) => r.userId);

    const users = await UserService.getByIds(userIds);
    const userMap: Record<string, any> = users;
    users.map((u) => (userMap[u.id] = u));

    return requests.map((r) => ({ ...r, user: userMap[r.userId] }));
  };

  static transform = async (requests: IncompleteRequest[]) => {
    const withUser = await RequestAggregator.addUser(requests);

    return withUser.map((u) => RequestSchema.parse(u));
  };
}
