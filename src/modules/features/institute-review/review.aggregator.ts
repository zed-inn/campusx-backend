import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { ReviewSchema } from "./dtos/review-response.dto";
import { ReviewAttributes } from "./review.model";

export type IncompleteReview = ReviewAttributes & {
  writer?: Record<string, unknown>;
};

export class ReviewAggregator {
  static addWriter = async (
    reviews: IncompleteReview[],
    reqUserId?: string | null
  ) => {
    const userIds = reviews.map((r) => r.userId);

    const iUsers = await ProfileService.getByIds(userIds);
    const tUsers = await ProfileAggregator.transform(iUsers, reqUserId);
    const userMap: Record<string, any> = {};
    tUsers.map((u) => (userMap[u.id] = u));

    return reviews.map((r) => ({ ...r, writer: userMap[r.userId] }));
  };

  static transform = async (
    reviews: IncompleteReview[],
    reqUserId?: string | null
  ) => {
    const withWriter = await ReviewAggregator.addWriter(reviews, reqUserId);

    return withWriter.map((w) => ReviewSchema.parse(w));
  };
}
