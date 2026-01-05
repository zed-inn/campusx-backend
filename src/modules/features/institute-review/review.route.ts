import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReviewController } from "./review.controller";
import {
  ReviewGetMineSchema,
  ReviewGetPageSchema,
} from "./dtos/review-get.dto";
import {
  ReviewCreateSchema,
  ReviewDeleteSchema,
  ReviewUpdateSchema,
} from "./dtos/review-action.dto";
import { array } from "zod";
import { ReviewSchema } from "./dtos/review-response.dto";

const router = new DetailedRouter("Institute Reviews");

router
  .describe(
    "Get Institute Reviews",
    "Retrieve a paginated list of reviews for institutes."
  )
  .query(ReviewGetPageSchema)
  .output("reviews", array(ReviewSchema), "Reviews fetched.")
  .get("/", ReviewController.getInstituteReviews);

router
  .describe(
    "Get My Review",
    "Retrieve the current user's review on an institute."
  )
  .userProfiled()
  .query(ReviewGetMineSchema)
  .output("review", ReviewSchema, "Review fetched.")
  .get("/me", ReviewController.getInstituteReviews);

router
  .describe("Create Review", "Submit a new review for an institute.")
  .userProfiled()
  .body(ReviewCreateSchema)
  .output("review", ReviewSchema, "Reviewed.")
  .post("/", ReviewController.createReview);

router
  .describe("Update Review", "Edit the content of an existing review.")
  .userProfiled()
  .body(ReviewUpdateSchema)
  .output("review", ReviewSchema, "Review updated.")
  .patch("/", ReviewController.updateReview);

router
  .describe("Delete Review", "Permanently remove a review.")
  .userProfiled()
  .query(ReviewDeleteSchema)
  .output("review", ReviewSchema, "Review deleted.")
  .delete("/", ReviewController.deleteReview);

export const InstituteReviewRouter = router;
