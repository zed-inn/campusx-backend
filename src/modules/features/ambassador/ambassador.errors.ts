import { AppError } from "@shared/errors/app-error";

export class AmbassadorErrors {
  static get noAmbassadorFound() {
    return new AppError("No Ambassador Found.", 404);
  }

  static get noUpdateAllowed() {
    return new AppError("Action has been taken, No Update Allowed Now.", 406);
  }

  static get noDeleteAllowed() {
    return new AppError("Action has been taken, No Delete Allowed Now.", 406);
  }

  static get noRequestAllowed() {
    return new AppError(
      "You are not a student of that institute, you are not allowed to be an ambassador for the institute",
      406
    );
  }

  static get userNotEnrolled() {
    return new AppError("You are not enrolled in that institute.", 406);
  }
}
