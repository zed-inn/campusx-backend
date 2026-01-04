import { Router } from "express";
import { ReviewController } from "./review.controller";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import {
  ReviewGetMineSchema,
  ReviewGetPageSchema,
} from "./dtos/review-get.dto";
import {
  ReviewCreateSchema,
  ReviewDeleteSchema,
  ReviewUpdateSchema,
} from "./dtos/review-action.dto";

const router = Router();

router.get(
  "/",
  ValidateReq.query(ReviewGetPageSchema),
  ReviewController.getInstituteReviews
);

router.get(
  "/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(ReviewGetMineSchema),
  ReviewController.getInstituteReviews
);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ReviewCreateSchema),
  ReviewController.createReview
);

router.patch(
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
  ValidateReq.query(ReviewDeleteSchema),
  ReviewController.deleteReview
);

export const InstituteReviewRouter = mount("/institute/review", router);
