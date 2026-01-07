import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ReviewGetMineDto, ReviewGetPageDto } from "./dtos/review-get.dto";
import { ReviewAggregator } from "./review.aggregator";
import { ReviewSchema } from "./dtos/review-response.dto";
import {
  ReviewCreateDto,
  ReviewDeleteDto,
  ReviewUpdateDto,
} from "./dtos/review-action.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

export class ReviewController {
  static getInstituteReviews = catchAsync(
    async (req: Request<{}, {}, {}, ReviewGetPageDto>, res: Response) => {
      const q = req.query;

      const iReviews = await ReviewService.getByInstituteId(
        q.instituteId,
        q.page
      );
      const tReviews = await ReviewAggregator.transform(iReviews, req.user?.id);
      const pReviews = tReviews.map((r) => ReviewSchema.parse(r));

      return ApiResponse.success(res, "Reviews fetched.", {
        reviews: pReviews,
      });
    }
  );

  static getMyReviewOnInstitute = catchAsync(
    async (req: Request<{}, {}, {}, ReviewGetMineDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iReview = await ReviewService.getMineOverInstitute(
        q.instituteId,
        user.id
      );
      const [tReview] = await ReviewAggregator.transform([iReview.plain]);
      const pReview = ReviewSchema.parse(tReview);

      return ApiResponse.success(res, "Review fetched.", {
        review: pReview,
      });
    }
  );

  static createReview = catchAsync(
    async (req: Request<{}, {}, ReviewCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iReview = await ReviewService.createNew(req.body, user.id);
      const [tReview] = await ReviewAggregator.transform([iReview.plain]);
      const pReview = ReviewSchema.parse(tReview);

      return ApiResponse.success(res, "Reviewed.", { review: pReview });
    }
  );

  static updateReview = catchAsync(
    async (req: Request<{}, {}, ReviewUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iReview = await ReviewService.update(req.body, user.id);
      const [tReview] = await ReviewAggregator.transform([iReview.plain]);
      const pReview = ReviewSchema.parse(tReview);

      return ApiResponse.success(res, "Review updated.", { review: pReview });
    }
  );

  static deleteReview = catchAsync(
    async (req: Request<{}, {}, {}, ReviewDeleteDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const review = await ReviewService.delete(q.reviewId, user.id);
      const responseData = GlobalDeleteSchema.parse(review);

      return ApiResponse.success(res, "Review deleted.", responseData);
    }
  );
}
