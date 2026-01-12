import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FeedbackGetFilterDto } from "./dtos/feedback-get.admin.dto";
import { FeedbackService } from "./feedback.admin.service";
import { FeedbackAggregator } from "./feedback.admin.aggregator";
import { FeedbackSchema } from "./dtos/feedback-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";
import {
  FeedbackDeleteDto,
  FeedbackUpdateDto,
} from "./dtos/feedback-action.admin.dto";

export class FeedbackController {
  static getFeedbacksByFilters = catchAsync(
    async (req: Request<{}, {}, {}, FeedbackGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iFeedbacks = await FeedbackService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const tFeedbacks = await FeedbackAggregator.transform(iFeedbacks);
      const pFeedbacks = tFeedbacks.map((f) => FeedbackSchema.parse(f));

      return ApiResponse.success(res, "Feedbacks fetched.", {
        feedbacks: pFeedbacks,
      });
    }
  );

  static updateFeedback = catchAsync(
    async (req: Request<{}, {}, FeedbackUpdateDto>, res: Response) => {
      const iFeedback = await FeedbackService.update(req.body);
      const [tFeedback] = await FeedbackAggregator.transform([iFeedback.plain]);
      const pFeedback = FeedbackSchema.parse(tFeedback);

      return ApiResponse.success(res, "Feedback updated.", {
        feedback: pFeedback,
      });
    }
  );

  static deleteFeedback = catchAsync(
    async (req: Request<{}, {}, {}, FeedbackDeleteDto>, res: Response) => {
      const q = req.query;

      const feedback = await FeedbackService.deleteById(q.id);

      return ApiResponse.success(res, "Feedback deleted.", { id: feedback.id });
    }
  );
}
