import { Institute, InstituteService } from "@modules/core/institutes";
import { Profile, ProfileInclude, ProfileService } from "@modules/core/profile";
import { Includeable } from "sequelize";
import { Review, ReviewInstance } from "./review.model";
import { ReviewCreateDto } from "./dtos/service/review-create.dto";
import db from "@config/database";
import { ReviewUpdateDto } from "./dtos/service/review-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { ReviewAttributes } from "./review.interface";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { ReviewSchema } from "./dtos/service/review-schema.dto";
import { Rui } from "@shared/dtos/req-user.dto";
import { ReviewErrors } from "./review.errors";

export class ReviewService extends BaseService<ReviewInstance> {
  static REVIEWS_PER_PAGE = 30;
  static OFFSET = createOffsetFn(this.REVIEWS_PER_PAGE);

  override get data() {
    const review = super.data;
    review.writer = ProfileService.parse(review.writer);
    review.institute = InstituteService.parse(review.institute);

    return ReviewSchema.parse(review);
  }

  static create = async (userId: string, data: ReviewCreateDto) => {
    return await db.transaction(async () => {
      const r = await Review.create({ ...data, userId });
      const service = await InstituteService.getById(data.instituteId);

      const instituteData = service.data;
      const institute = service.model;
      const newRating =
        (instituteData.rating * instituteData.reviewsCount +
          r.dataValues.rating) /
        (instituteData.reviewsCount + 1);

      await institute.update({
        rating: isNaN(newRating) ? 0 : newRating,
        reviewsCount: instituteData.reviewsCount + 1,
      });

      return this.getById(r.dataValues.id);
    });
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const review = await Review.findByPk(id, {
      include: [ReviewInclude.institute, ReviewInclude.writer(reqUserId)],
    });
    if (!review) throw ReviewErrors.noReviewFound;

    return new ReviewService(review);
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId?: Rui
  ) => {
    const reviews = await Review.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: this.REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.institute, ReviewInclude.writer(reqUserId)],
    });

    return reviews.map((r) => new ReviewService(r));
  };

  static getByUserId = async (id: string, page: number, reqUserId?: Rui) => {
    const reviews = await Review.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: this.REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.institute, ReviewInclude.writer(reqUserId)],
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
      const instituteData = serviceInst.data;

      if (data.rating) {
        const currRating = data.rating;
        const newRating =
          (instituteData.reviewsCount * instituteData.rating -
            prevRating +
            currRating) /
          instituteData.reviewsCount;
        await institute.update({ rating: isNaN(newRating) ? 0 : newRating });
      }

      return this.getById(service.data.id);
    });
  };

  static delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const service = await ReviewService.getById(id);
      service.checkOwnership(userId);

      const review = service.model;
      const reviewData = service.data;
      await review.destroy();

      const newRating =
        (reviewData.institute.rating * reviewData.institute.reviewsCount -
          reviewData.rating) /
        (reviewData.institute.reviewsCount - 1);
      await Institute.update(
        {
          rating: isNaN(newRating) ? 0 : newRating,
          reviewsCount: reviewData.institute.reviewsCount - 1,
        },
        { where: { id: reviewData.instituteId } }
      );

      return new ReviewService(review);
    });
  };
}

class ReviewInclude {
  static writer(userId?: Rui): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.followedBy(userId)],
    };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }
}
