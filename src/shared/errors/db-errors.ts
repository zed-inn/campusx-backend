import { AppError } from "./app-error";

export class DB_Errors {
  static get notFound() {
    return new AppError("Not Found.", 404);
  }
}
