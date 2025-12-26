import { AppError } from "@shared/errors/app-error";

export class InsightsErrors {
  static get noCategoryFound() {
    return new AppError("No Category Found.", 404);
  }

  static get noInsightFound() {
    return new AppError("No Insight Found.", 404);
  }

  static get invalidStatus() {
    return new AppError("Invalid Status.", 400);
  }
}
