import { InstituteService } from "@modules/core/institutes";
import { Profile, ProfileAttributes } from "@modules/core/user-profile";
import { Includeable } from "sequelize";
import { Review, ReviewAttributes, ReviewInstance } from "./review.model";
import { ReviewCreateDto } from "./dtos/review-create.dto";
import db from "@config/database";
import { ReviewUpdateDto } from "./dtos/review-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { ReviewErrors } from "./review.errors";
import { REVIEWS_PER_PAGE } from "@config/constants/items-per-page";

export class ReviewService extends BaseService<
  ReviewInstance,
  ReviewAttributes
> {
  static OFFSET = createOffsetFn(REVIEWS_PER_PAGE);

  override get data() {
    return super.data as ReviewAttributes & { writer: ProfileAttributes };
  }

  static create = async (userId: string, data: ReviewCreateDto) => {
    return await db.transaction(async () => {
      const r = await Review.create({ ...data, userId });
      const service = await InstituteService.getById(data.instituteId);

      const instData = service.data;
      const institute = service.model;
      const newRating = ReviewUtils.addInRating(
        instData.rating,
        instData.reviewsCount,
        r.dataValues.rating
      );

      await institute.update({
        rating: newRating,
        reviewsCount: instData.reviewsCount + 1,
      });

      return this.getById(r.dataValues.id);
    });
  };

  static getById = async (id: string) => {
    const review = await Review.findByPk(id, {
      include: [ReviewInclude.writer],
    });
    if (!review) throw ReviewErrors.noReviewFound;

    return new ReviewService(review);
  };

  static getByInstituteId = async (id: string, page: number) => {
    const reviews = await Review.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.writer],
    });

    return reviews.map((r) => new ReviewService(r));
  };

  static getByUserId = async (id: string, page: number) => {
    const reviews = await Review.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.writer],
    });

    return reviews.map((r) => new ReviewService(r));
  };

  static update = async (data: ReviewUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      if (!data.body && !data.rating) throw ReviewErrors.noBodyOrRatingGiven;

      const { id, ...updateData } = data;

      const service = await ReviewService.getById(data.id);
      service.checkOwnership(userId);

      const review = service.model;
      const prevRating = service.data.rating;
      const cleanData = removeUndefined(updateData);
      if (Object.keys(cleanData).length)
        await review.update(updateData as Partial<ReviewAttributes>);

      const serviceInst = await InstituteService.getById(
        service.data.instituteId
      );
      const institute = serviceInst.model;
      const instData = serviceInst.data;

      if (data.rating) {
        const currRating = data.rating;
        const newRating = ReviewUtils.addInRating(
          ReviewUtils.subtractFromRating(
            instData.rating,
            instData.reviewsCount,
            prevRating
          ),
          instData.reviewsCount - 1,
          currRating
        );

        await institute.update({ rating: newRating });
      }

      return this.getById(service.data.id);
    });
  };

  static delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const service = await ReviewService.getById(id);
      service.checkOwnership(userId);

      const serviceInst = await InstituteService.getById(
        service.data.instituteId
      );
      const institute = serviceInst.model;
      const instData = serviceInst.data;

      const review = service.model;
      const reviewData = service.data;
      await review.destroy();

      const newRating = ReviewUtils.subtractFromRating(
        instData.rating,
        instData.reviewsCount,
        reviewData.rating
      );

      await institute.update({
        rating: newRating,
        reviewsCount: instData.reviewsCount - 1,
      });
    });
  };
}

class ReviewInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }
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
