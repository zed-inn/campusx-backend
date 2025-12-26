import { AppError } from "@shared/errors/app-error";

export class ReviewErrors {
  static get noReviewFound() {
    return new AppError("No Review Found.", 404);
  }

  static get noBodyOrRatingGiven() {
    return new AppError("Body/rating is required. Provide one or both.", 400);
  }
}
