import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { ReviewResponseSchema } from "./dtos/review-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { ReviewCreateDto } from "./dtos/review-create.dto";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ReviewUpdateDto } from "./dtos/review-update.dto";

export class ReviewController {
  static getInstituteReviews = catchAsync(
    async (req: Request, res: Response) => {
      const page = Parse.pageNum(req.query.page);
      const id = Parse.id(req.query.instituteId);

      const reviews = await ReviewService.getByInstituteId(
        id,
        page,
        req.user?.id
      );
      const parsedReviews = reviews.map((r) => ReviewResponseSchema.parse(r));

      return ApiResponse.success(res, "Reviews fetched.", {
        reviews: parsedReviews,
      });
    }
  );

  static createReview = catchAsync(
    async (req: Request<{}, {}, ReviewCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const review = await ReviewService.create(user.id, req.body);
      const parsedReview = ReviewResponseSchema.parse(review);

      return ApiResponse.success(res, "Reviewed.", { review: parsedReview });
    }
  );

  static updateReview = catchAsync(
    async (req: Request<{}, {}, ReviewUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const review = await ReviewService.update(user.id, req.body);
      const parsedReview = ReviewResponseSchema.parse(review);

      return ApiResponse.success(res, "Review updated.", {
        review: parsedReview,
      });
    }
  );

  static deleteReview = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.query.id);

    const review = await ReviewService.delete(user.id, id);
    const parsedReview = ReviewResponseSchema.parse(review);

    return ApiResponse.success(res, "Review deleted.", {
      review: parsedReview,
    });
  });
}
