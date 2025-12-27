import { AppError } from "@shared/errors/app-error";

export class InstituteErrors {
  static get noInstituteFound() {
    return new AppError("No Institute Found.", 404);
  }
}
