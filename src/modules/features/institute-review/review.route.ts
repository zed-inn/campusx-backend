import { Router } from "express";
import { ReviewController } from "./review.controller";
import { ReviewCreateSchema } from "./dtos/service/review-create.dto";
import { ReviewUpdateSchema } from "./dtos/service/review-update.dto";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";

const router = Router();

router.get("/", ReviewController.getInstituteReviews);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ReviewCreateSchema),
  ReviewController.createReview
);

router.put(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ReviewUpdateSchema),
  ReviewController.updateReview
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ReviewController.deleteReview
);

export const InstituteReviewRouter = mount("/insitute/review", router);
