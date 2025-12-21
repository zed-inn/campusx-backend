import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";
import { z } from "zod";
import { FeedbackResponseSchema } from "./dtos/feedback-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class FeedbackController {
  static giveFeedback = catchAsync(async (req: Request, res: Response) => {
    const message = z.string("Invalid Message").parse(req.body.message);

    const feedback = await FeedbackService.create(message, req.user?.id);
    const parsedFeedback = FeedbackResponseSchema.parse(feedback);

    return ApiResponse.success(res, "Feedback given.", {
      feedback: parsedFeedback,
    });
  });
}
