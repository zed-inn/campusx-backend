import { z } from "zod";
import { EndpointDetails } from "@shared/utils/readme-types";
import { ReviewResponseSchema } from "./dtos/controller/review-response.dto";
import { ReviewCreateSchema } from "./dtos/service/review-create.dto";
import { ReviewUpdateSchema } from "./dtos/service/review-update.dto";

export const ReviewDocs: EndpointDetails[] = [
  {
    category: "Review",
    title: "Get reviews",
    method: "GET",
    endpoint: "/institute/review",
    description: "Get reviews for an insitute",
    query: z.object({
      id: z.string(),
      page: z.number(),
    }),
    response: {
      message: "Reviews fetched.",
      data: z.object({
        reviews: z.array(ReviewResponseSchema),
      }),
    },
  },
  {
    category: "Review",
    title: "Create review",
    method: "POST",
    endpoint: "/institute/review",
    description: "Review an institute with a rating and some content",
    authTokenReq: true,
    body: ReviewCreateSchema,
    response: {
      message: "Reviewed.",
      data: z.object({
        review: ReviewResponseSchema,
      }),
    },
  },
  {
    category: "Review",
    title: "Update review",
    method: "POST",
    endpoint: "/institute/review",
    description: "Update a review you have written",
    authTokenReq: true,
    body: ReviewUpdateSchema,
    response: {
      message: "Review updated.",
      data: z.object({
        review: ReviewResponseSchema,
      }),
    },
  },
  {
    category: "Review",
    title: "Delete review",
    method: "DELETE",
    endpoint: "/institute/review",
    description: "Deletes a review you have written",
    authTokenReq: true,
    query: z.object({
      id: z.string(),
    }),
    response: {
      message: "Review deleted.",
      data: z.object({
        review: ReviewResponseSchema,
      }),
    },
  },
];
