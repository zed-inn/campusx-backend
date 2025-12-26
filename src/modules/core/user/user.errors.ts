import { AppError } from "@shared/errors/app-error";

export class UserErrors {
  static get noUserFound() {
    return new AppError("No User Found.", 404);
  }
}
