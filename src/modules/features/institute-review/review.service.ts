import { InstituteService } from "@modules/core/institutes";
import { Review, ReviewAttributes, ReviewInstance } from "./review.model";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { REVIEWS_PER_PAGE } from "@config/constants/items-per-page";
import { ReviewCreateDto, ReviewUpdateDto } from "./dtos/review-action.dto";
import { hasKeys } from "@shared/utils/object-length";
import { DB_Errors } from "@shared/errors/db-errors";

class _ReviewService extends BaseService<ReviewInstance> {
  protected OFFSET = createOffsetFn(REVIEWS_PER_PAGE);

  constructor() {
    super(Review);
  }

  createNew = async (data: ReviewCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const review = await Review.create({ ...data, userId });

      const institute = await InstituteService.getById(data.instituteId);
      const { rating, reviewsCount } = institute.plain;

      const newRating = ReviewUtils.addInRating(
        rating,
        reviewsCount,
        data.rating
      );

      await institute.update({
        rating: newRating,
        reviewsCount: reviewsCount + 1,
      });

      return review;
    });
  };

  getByInstituteId = async (instituteId: string, page: number) => {
    const reviews = await Review.findAll({
      where: { instituteId },
      offset: this.OFFSET(page),
      limit: REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return reviews.map((r) => r.plain);
  };

  getMineOverInstitute = async (instituteId: string, userId: string) => {
    const review = await Review.findOne({ where: { userId, instituteId } });
    if (!review) throw DB_Errors.notFound;

    return review;
  };

  update = async (data: ReviewUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { id, ...updateData } = data;

      const review = await this.getById(data.id);
      this.checkOwnership(review, userId);

      const { rating: prevRating, instituteId } = review.plain;

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await review.update(updateData as Partial<ReviewAttributes>);

      const institute = await InstituteService.getById(instituteId);
      const { rating, reviewsCount } = institute.plain;

      if (data.rating) {
        const newRating = ReviewUtils.addInRating(
          ReviewUtils.subtractFromRating(rating, reviewsCount, prevRating),
          reviewsCount - 1,
          rating
        );

        await institute.update({ rating: newRating });
      }

      return review;
    });
  };

  delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const review = await this.getById(id);
      this.checkOwnership(review, userId);

      const { instituteId, rating: oldRating } = review.plain;

      const institute = await InstituteService.getById(instituteId);
      const { rating, reviewsCount } = institute.plain;

      await review.destroy();

      const newRating = ReviewUtils.subtractFromRating(
        rating,
        reviewsCount,
        oldRating
      );

      await institute.update({
        rating: newRating,
        reviewsCount: reviewsCount - 1,
      });

      return review.plain;
    });
  };
}

class ReviewUtils {
  static normalizeIsNanRating = (rating: number) =>
    isNaN(rating) ? 0 : rating;

  static addInRating = (
    oldRating: number,
    oldRatingsCount: number,
    ratingToAdd: number
  ) => {
    const newRating =
      (oldRating * oldRatingsCount + ratingToAdd) / (oldRatingsCount + 1);
    return this.normalizeIsNanRating(newRating);
  };

  static subtractFromRating = (
    oldRating: number,
    oldRatingsCount: number,
    ratingToSubtract: number
  ) => {
    const newRating =
      (oldRating * oldRatingsCount - ratingToSubtract) / (oldRatingsCount - 1);
    return this.normalizeIsNanRating(newRating);
  };
}

export const ReviewService = new _ReviewService();
