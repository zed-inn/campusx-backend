import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ReviewCreateDto } from "./dtos/review-create.dto";
import { ReviewUpdateDto } from "./dtos/review-update.dto";
import { ProfileUtils } from "@modules/core/user-profile";
import { ReviewResponseSchema } from "./dtos/review-response.dto";

export class ReviewController {
  static getInstituteReviews = catchAsync(
    async (req: Request, res: Response) => {
      const q = s
        .create({ id: s.fields.id, page: s.fields.page })
        .parse(req.query);

      const services = await ReviewService.getByInstituteId(q.id, q.page);
      const profiles = services.map((s) => s.data.writer);
      const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
      const profileMap: Record<string, any> = {};
      joined.map((j) => (profileMap[j.id] = j));
      const joinedReviews = services.map((s) => ({
        ...s.data,
        writer: profileMap[s.data.userId],
      }));
      const reviews = joinedReviews.map((s) => ReviewResponseSchema.parse(s));

      return ApiResponse.success(res, "Reviews fetched.", { reviews });
    }
  );

  static createReview = catchAsync(
    async (req: Request<{}, {}, ReviewCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ReviewService.create(user.id, req.body);
      const [joined] = await ProfileUtils.joinAll(
        [service.data.writer],
        user.id
      );
      const review = ReviewResponseSchema.parse({
        ...service.data,
        writer: joined,
      });

      return ApiResponse.success(res, "Reviewed.", { review });
    }
  );

  static updateReview = catchAsync(
    async (req: Request<{}, {}, ReviewUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ReviewService.update(req.body, user.id);
      const [joined] = await ProfileUtils.joinAll(
        [service.data.writer],
        user.id
      );
      const review = ReviewResponseSchema.parse({
        ...service.data,
        writer: joined,
      });

      return ApiResponse.success(res, "Review updated.", { review });
    }
  );

  static deleteReview = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await ReviewService.delete(q.id, user.id);

    return ApiResponse.success(res, "Review deleted.");
  });
}
