import { FEEDBACKS_PER_PAGE } from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import {
  Feedback,
  FeedbackAttributes,
  FeedbackInstance,
} from "../feedback.model";
import { FeedbackFiltersDto } from "./dtos/feedback-get.admin.dto";
import { OrderItem } from "sequelize";
import { FeedbackUpdateDto } from "./dtos/feedback-action.admin.dto";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _FeedbackService extends BaseService<FeedbackInstance> {
  protected OFFSET = createOffsetFn(FEEDBACKS_PER_PAGE);

  constructor() {
    super(Feedback);
  }

  getByFilters = async (
    filters: FeedbackFiltersDto,
    order: string[][],
    page: number
  ) => {
    const feedbacks = await Feedback.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: FEEDBACKS_PER_PAGE,
      order: order as OrderItem[],
    });

    return feedbacks.map((f) => f.plain);
  };

  update = async (data: FeedbackUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const feedback = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await feedback.update(cleanData as Partial<FeedbackAttributes>);

      return feedback;
    });
  };
}

export const FeedbackService = new _FeedbackService();
