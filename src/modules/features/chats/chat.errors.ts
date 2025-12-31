import { AppError } from "@shared/errors/app-error";

export class ChatErrors {
  static get noChatFound() {
    return new AppError("No Chat Found.", 404);
  }

  static get chatIsNotYours() {
    return new AppError("Invalid Request.", 406);
  }

  static get noMessageFound() {
    return new AppError("No Message Found.", 404);
  }
}
