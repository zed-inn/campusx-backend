import { z } from "zod";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { UploadController } from "./upload.controller";
import upload from "@shared/middlewares/upload";

const router = new DetailedRouter("Upload Files");

router
  .describe("Upload Image", "Upload image")
  .userProfiled()
  .output("url", z.string(), "File uploaded.")
  .post("/", upload.single("file"), UploadController.uploadImage);

export const UploadRouter = router;
