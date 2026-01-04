import { AppError } from "@shared/errors/app-error";

export class DiscussionErrors {
  static get noDiscussionFound() {
    return new AppError("No Discussion Found.", 404);
  }

  static get noLikeFound() {
    return new AppError("No Like Found.", 404);
  }
}
