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
}
