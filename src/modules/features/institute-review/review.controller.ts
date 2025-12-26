import { catchAsync } from "@shared/utils/catch-async";
import { createSchema } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { ReviewResponseSchema } from "./dtos/controller/review-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ReviewCreateDto } from "./dtos/service/review-create.dto";
import { ReviewUpdateDto } from "./dtos/service/review-update.dto";

export class ReviewController {
  static getInstituteReviews = catchAsync(
    async (req: Request, res: Response) => {
      const q = createSchema({ page: "page", id: "id" }).parse(req.query);

      const services = await ReviewService.getByInstituteId(
        q.id,
        q.page,
        req.user?.id
      );
      const reviews = services.map((s) => ReviewResponseSchema.parse(s));

      return ApiResponse.success(res, "Reviews fetched.", { reviews });
    }
  );

  static createReview = catchAsync(
    async (req: Request<{}, {}, ReviewCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ReviewService.create(user.id, req.body);
      const review = ReviewResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Reviewed.", { review });
    }
  );

  static updateReview = catchAsync(
    async (req: Request<{}, {}, ReviewUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ReviewService.update(req.body, user.id);
      const review = ReviewResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Review updated.", { review });
    }
  );

  static deleteReview = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.query);

    const service = await ReviewService.delete(q.id, user.id);
    const review = ReviewResponseSchema.parse(service.data);

    return ApiResponse.success(res, "Review deleted.", { review });
  });
}
