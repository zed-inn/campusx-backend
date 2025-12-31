import {
  Feedback,
  FeedbackAttributes,
  FeedbackInstance,
} from "./feedback.model";
import { STATUS } from "./feedback.constants";
import { BaseService } from "@shared/services/base.service";

export class FeedbackService extends BaseService<
  FeedbackInstance,
  FeedbackAttributes
> {
  static create = async (message: string, userId: string | null = null) => {
    const f = await Feedback.create({
      message,
      userId,
      status: STATUS.PENDING,
    });

    return new FeedbackService(f);
  };
}
