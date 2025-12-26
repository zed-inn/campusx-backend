import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";
import { ApiResponse } from "@shared/utils/api-response";
import { createSchema } from "@shared/utils/create-schema";

export class FeedbackController {
  static giveFeedback = catchAsync(async (req: Request, res: Response) => {
    const q = createSchema({ message: "string" }).parse(req.body);
    await FeedbackService.create(q.message, req.user?.id);

    return ApiResponse.success(res, "Feedback given.");
  });
}
