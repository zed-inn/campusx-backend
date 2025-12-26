import { AppError } from "@shared/errors/app-error";

export class FeedbackErrors {
  static get noFeedbackFound() {
    return new AppError("No Feedback Found.", 404);
  }
}
