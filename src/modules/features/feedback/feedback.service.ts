import { Includeable } from "sequelize";
import { Feedback } from "./feedback.model";
import { Profile, ProfileService } from "@modules/core/profile";
import { FEEDBACK_CONFIG } from "./feedback.config";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { FeedbackErrors } from "./feedback.errors";
import { Rui } from "@shared/dtos/req-user.dto";
import { FeedbackSchema } from "./dtos/service/feedback-schema.dto";

export class FeedbackService extends BaseService<
  InstanceType<typeof Feedback>
> {
  static FEEDBACKS_PER_PAGE = 30;
  static OFFSET = createOffsetFn(this.FEEDBACKS_PER_PAGE);

  override get data() {
    const feedback = super.data;
    feedback.writer = ProfileService.parse(feedback.writer);

    return FeedbackSchema.parse(feedback);
  }

  static create = async (message: string, userId: Rui = null) => {
    const f = await Feedback.create({
      message,
      userId,
      status: FEEDBACK_CONFIG.STATUS.PENDING,
    });

    return this.getById(f.dataValues.id);
  };

  static getById = async (id: string) => {
    const feedback = await Feedback.findByPk(id, {
      include: [FeedbackInclude.writer],
    });
    if (!feedback) throw FeedbackErrors.noFeedbackFound;

    return new FeedbackService(feedback);
  };
}

class FeedbackInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }
}
