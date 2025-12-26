import { AppError } from "@shared/errors/app-error";

export class CommentErrors {
  static get noCommentFound() {
    return new AppError("No Comment Found.", 404);
  }

  static get replyingDifferentNotAllowed() {
    return new AppError(
      "Replying on comments of different forums is not allowed.",
      406
    );
  }
}
