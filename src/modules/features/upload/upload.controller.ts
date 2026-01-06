import { AppError } from "@shared/errors/app-error";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { UploadService } from "./upload.service";
import { ApiResponse } from "@shared/utils/api-response";

export class UploadController {
  static uploadImage = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) throw new AppError("No file given", 400);

    const url = await UploadService.putObjectInS3Bucket(req.file);

    return ApiResponse.success(res, "File uploaded.", { url });
  });
}
