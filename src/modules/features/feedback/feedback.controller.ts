import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";
import { ApiResponse } from "@shared/utils/api-response";
import { FeedbackCreateDto } from "./dtos/feedback-create.dto";

export class FeedbackController {
  static giveFeedback = catchAsync(
    async (req: Request<{}, {}, FeedbackCreateDto>, res: Response) => {
      await FeedbackService.createNew(req.body, req.user?.id);

      return ApiResponse.success(res, "Feedback given.");
    }
  );
}
