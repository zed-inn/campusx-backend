import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";
import { ApiResponse } from "@shared/utils/api-response";
import { s } from "@shared/utils/create-schema";

export class FeedbackController {
  static giveFeedback = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ message: s.fields.string }).parse(req.body);
    await FeedbackService.create(q.message, req.user?.id);

    return ApiResponse.success(res, "Feedback given.");
  });
}
