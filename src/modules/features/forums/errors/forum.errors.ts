import { AppError } from "@shared/errors/app-error";

export class ForumErrors {
  static get noForumFound() {
    return new AppError("No Forum Found.", 404);
  }

  static get notLiked() {
    return new AppError("Not Liked.", 404);
  }
}
