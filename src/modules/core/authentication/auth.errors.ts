import { AppError } from "@shared/errors/app-error";

export class AuthErrors {
  static get unauthorized(): AppError {
    return new AppError("Unauthorized.", 401);
  }

  static get invalidOtp(): AppError {
    return new AppError("Invalid otp.", 400);
  }
}
