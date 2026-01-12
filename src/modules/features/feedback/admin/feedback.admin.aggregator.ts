import { ProfileService } from "@modules/core/profile";
import { FeedbackAttributes } from "../feedback.model";
import { FeedbackSchema } from "./dtos/feedback-response.admin.dto";

export type IncompleteFeedback = FeedbackAttributes & {
  user?: Record<string, unknown>;
};

export class FeedbackAggregator {
  static addUser = async (feedbacks: IncompleteFeedback[]) => {
    const userIds = feedbacks.map((r) => r.userId).filter((f) => f !== null);

    const users = await ProfileService.getByIds(userIds);
    const userMap: Record<string, any> = {};
    users.map((u) => (userMap[u.id] = u));

    return feedbacks.map((r) => ({
      ...r,
      user: r.userId ? userMap[r.userId] : null,
    }));
  };

  static transform = async (feedbacks: IncompleteFeedback[]) => {
    const withUser = await FeedbackAggregator.addUser(feedbacks);

    return withUser.map((r) => FeedbackSchema.parse(r));
  };
}
