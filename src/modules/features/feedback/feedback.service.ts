import { FeedbackCreateDto } from "./dtos/feedback-create.dto";
import { Feedback, FeedbackInstance } from "./feedback.model";
import { BaseService } from "@shared/services/base.service";

class _FeedbackService extends BaseService<FeedbackInstance> {
  constructor() {
    super(Feedback);
  }

  createNew = async (data: FeedbackCreateDto, userId: string | null = null) => {
    return await this.create({ ...data, userId });
  };
}

export const FeedbackService = new _FeedbackService();
