import { EndpointDetails } from "@shared/docs/readme-types";
import { z } from "zod";

export const FeedbackDocs: EndpointDetails[] = [
  {
    category: "Feedback",
    title: "Give feedback",
    method: "POST",
    endpoint: "/feedback",
    description: "Give feedback, either by logging in or without",
    query: z.object({
      message: z.string(),
    }),
    response: {
      message: "Feedback given.",
    },
  },
];
