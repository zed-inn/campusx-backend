import { AppError } from "@shared/errors/app-error";

export class EducationErrors {
  static get noEducationFound() {
    return new AppError("No Education Found.", 404);
  }
}
