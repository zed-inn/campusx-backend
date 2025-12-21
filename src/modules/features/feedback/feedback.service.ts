import { Includeable } from "sequelize";
import { Feedback } from "./feedback.model";
import { Profile, ProfileService } from "@modules/core/profile";
import { AppError } from "@shared/errors/app-error";
import { FeedbackFullSchema as FeedbackFS } from "./dtos/feedback-full.dto";
import { FEEDBACK_CONFIG } from "./feedback.config";

export class FeedbackService {
  static FEEDBACKS_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.FEEDBACKS_PER_PAGE;

  static getById = async (id: string) => {
    const feedback = await Feedback.findByPk(id, {
      include: [FeedbackInclude.writer],
    });
    if (!feedback) throw new AppError("No Feedback Found.", 404);

    return FeedbackFS.parse(feedback.get({ plain: true }));
  };

  static getByStatus = async (status: string, page: number) => {
    const feedbacks = await Feedback.findAll({
      where: { status },
      offset: this.OFFSET(page),
      limit: this.FEEDBACKS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [FeedbackInclude.writer],
    });

    return feedbacks.map((f) => FeedbackFS.parse(f.get({ plain: true })));
  };

  static create = async (message: string, userId: string | null = null) => {
    const feedback = await Feedback.create({
      message,
      userId,
      status: FEEDBACK_CONFIG.STATUS.PENDING,
    });

    let writer = null;
    if (userId) writer = await ProfileService.getById(userId);

    return FeedbackFS.parse({ ...feedback.get({ plain: true }), writer });
  };

  static update = async (id: string, status: string) => {
    const feedback = await Feedback.findByPk(id, {
      include: [FeedbackInclude.writer],
    });
    if (!feedback) throw new AppError("No Feedback Found.", 404);

    await feedback.update({ status });

    return FeedbackFS.parse(feedback.get({ plain: true }));
  };

  static delete = async (id: string) => {
    const feedback = await Feedback.findByPk(id, {
      include: [FeedbackInclude.writer],
    });
    if (!feedback) throw new AppError("No Feedback Found.", 404);

    const feedbackData = feedback.get({ plain: true });

    await feedback.destroy();

    return FeedbackFS.parse(feedbackData);
  };
}

class FeedbackInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }
}
