import { AppError } from "@shared/errors/app-error";

export class AuthErrors {
  static get noEmailOrUsernameGiven(): AppError {
    return new AppError("Email/Username is required.", 400);
  }

  static get unauthorized(): AppError {
    return new AppError("Unauthorized.", 401);
  }

  static get invalidOtp() : AppError {
    return new AppError("Invalid otp.", 400)
  }
}
