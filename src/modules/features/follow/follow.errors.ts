import { AppError } from "@shared/errors/app-error";

export class FollowErrors {
  static get followSelf() {
    return new AppError("Following yourself is not allowed.", 406);
  }

  static get unfollowSelf() {
    return new AppError("Unfollowing yourself is not allowed.", 406);
  }
}
