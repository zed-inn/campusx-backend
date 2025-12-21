import { Institute, InstituteService } from "@modules/core/institutes";
import { Profile, ProfileService } from "@modules/core/profile";
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

  static getById = async (id: string) => {
    const review = await Review.findByPk(id, {
      include: [ReviewInclude.institute, ReviewInclude.writer],
    });
    if (!review) throw new AppError("No Review Found.", 404);

    return ReviewFS.parse(review);
  };

  static getByInstituteId = async (id: string, page: number) => {
    const reviews = await Review.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: this.REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.institute, ReviewInclude.writer],
    });

    return reviews.map((r) => ReviewFS.parse(r));
  };

  static getByUserId = async (id: string, page: number) => {
    const reviews = await Review.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: this.REVIEWS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [ReviewInclude.institute, ReviewInclude.writer],
    });

    return reviews.map((r) => ReviewFS.parse(r));
  };

  static create = async (userId: string, data: ReviewCreateDto) => {
    return await db.transaction(async () => {
      const review = await Review.create({ ...data, userId });
      const institute = await InstituteService.getById(data.instituteId);

      const profile = await ProfileService.getById(userId);

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

      return ReviewFS.parse({
        ...review.get({ plain: true }),
        writer: profile,
        institute,
      });
    });
  };

  static update = async (userId: string, data: ReviewUpdateDto) => {
    return await db.transaction(async () => {
      if (!data.body && !data.rating)
        throw new AppError("Atleast one of body/rating is required.", 406);

      const review = await Review.findOne({
        where: { id: data.id, userId },
        include: [ReviewInclude.writer, ReviewInclude.institute],
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

      return reviewData;
    });
  };

  static delete = async (userId: string, id: string) => {
    return await db.transaction(async () => {
      const review = await Review.findOne({
        where: { id, userId },
        include: [ReviewInclude.writer, ReviewInclude.institute],
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

      return reviewData;
    });
  };
}

class ReviewInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }
}
