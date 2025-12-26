import { AppError } from "@shared/errors/app-error";

export class ReportErrors {
  static get noReportFound(): AppError {
    return new AppError("No Report Found.", 404);
  }
}
