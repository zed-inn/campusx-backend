import { Institute, InstituteService } from "@modules/core/institutes";
import {
  Profile,
  ProfileInclude,
  ProfileService,
  ProfileUtils,
} from "@modules/core/profile";
import { Includeable } from "sequelize";
import { Review } from "./review.model";
import { AppError } from "@shared/errors/app-error";
import { ReviewFullSchema as ReviewFS } from "./dtos/review-full.dto";
import { ReviewCreateDto } from "./dtos/review-create.dto";
import db from "@config/database";
import { ReviewUpdateDto } from "./dtos/review-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { ReviewAttributes } from "./review.interface";

export class ReviewService {
  static REVIEWS_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.REVIEWS_PER_PAGE;

  static parse = (review: any) =>
    ReviewUtils.process(review?.get({ plain: true }));

  static getById = async (id: string, reqUserId: string | null = null) => {
    const review = await Review.findByPk(id, {
      include: [ReviewInclude.institute, ReviewInclude.writer(reqUserId)],
    });
    if (!review) throw new AppError("No Review Found.", 404);

    return this.parse(review);
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId: string | null = null
  ) => {
    const reviews = await Review.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: this.REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.institute, ReviewInclude.writer(reqUserId)],
    });

    return reviews.map((r) => this.parse(r));
  };

  static getByUserId = async (
    id: string,
    page: number,
    reqUserId: string | null = null
  ) => {
    const reviews = await Review.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: this.REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.institute, ReviewInclude.writer(reqUserId)],
    });

    return reviews.map((r) => this.parse(r));
  };

  static create = async (userId: string, data: ReviewCreateDto) => {
    return await db.transaction(async () => {
      const review = await Review.create({ ...data, userId });
      const institute = await InstituteService.getById(data.instituteId);

      const writer = await ProfileService.getById(userId);

      const newRating =
        (institute.rating * institute.reviewsCount + review.dataValues.rating) /
        (institute.reviewsCount + 1);
      await Institute.update(
        {
          rating: isNaN(newRating) ? 0 : newRating,
          reviewsCount: institute.reviewsCount + 1,
        },
        { where: { id: institute.id } }
      );

      return this.parse({ ...review.get({ plain: true }), writer, institute });
    });
  };

  static update = async (userId: string, data: ReviewUpdateDto) => {
    return await db.transaction(async () => {
      if (!data.body && !data.rating)
        throw new AppError("Atleast one of body/rating is required.", 406);

      const review = await Review.findOne({
        where: { id: data.id, userId },
        include: [ReviewInclude.writer(), ReviewInclude.institute],
      });
      if (!review) throw new AppError("No Review Found.", 404);

      const prevRating = review.dataValues.rating;
      const updateData = removeUndefined({
        body: data.body,
        rating: data.rating,
      });
      await review.update(updateData as Partial<ReviewAttributes>);
      const reviewData = ReviewFS.parse(review.get({ plain: true }));

      if (data.rating) {
        const currRating = reviewData.rating;
        const newRating =
          (reviewData.institute.reviewsCount * reviewData.institute.rating -
            prevRating +
            currRating) /
          reviewData.institute.reviewsCount;
        await Institute.update(
          { rating: isNaN(newRating) ? 0 : newRating },
          { where: { id: reviewData.instituteId } }
        );
      }

      return this.parse(review);
    });
  };

  static delete = async (userId: string, id: string) => {
    return await db.transaction(async () => {
      const review = await Review.findOne({
        where: { id, userId },
        include: [ReviewInclude.writer(), ReviewInclude.institute],
      });
      if (!review) throw new AppError("No Review Found.", 404);

      const reviewData = ReviewFS.parse(review.get({ plain: true }));
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

      return this.parse(review);
    });
  };
}

class ReviewInclude {
  static writer(userId: string | null = null): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.isFollowing(userId)],
    };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }
}

class ReviewUtils {
  static process = (review: any) => {
    review.writer = ProfileUtils.process(review.writer);

    return ReviewFS.parse(review);
  };
}
