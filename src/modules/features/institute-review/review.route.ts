import { Router } from "express";
import { ReviewController } from "./review.controller";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { ReviewCreateSchema } from "./dtos/review-create.dto";
import { ReviewUpdateSchema } from "./dtos/review-update.dto";

const router = Router();

router.get("/", ReviewController.getInstituteReviews);

router.post(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(ReviewCreateSchema),
  ReviewController.createReview
);

router.put(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(ReviewUpdateSchema),
  ReviewController.updateReview
);

router.delete("/", isLoggedIn, isProfiledUser, ReviewController.deleteReview);

export const InstituteReviewRouter = router;
