import { z } from "zod";
import { EndpointDetails } from "@shared/docs/readme-types";
import { InsightResponseSchema } from "./dtos/controller/insight-response.dto";

export const InsightsDocs: EndpointDetails[] = [
  {
    category: "Insight",
    title: "Get categories",
    method: "GET",
    endpoint: "/insights/categories",
    description: "Get category names of insights",
    query: z.object({
      page: z.string(),
    }),
    response: {
      message: "Categories fetched.",
      data: z.object({
        categories: z.array(z.string()),
      }),
    },
  },
  {
    category: "Insight",
    title: "Get insights",
    method: "GET",
    endpoint: "/insights",
    description: "Get insights",
    query: z.object({
      page: z.string(),
      category: z.string(),
    }),
    response: {
      message: "Insights fetched.",
      data: z.object({
        insights: z.array(InsightResponseSchema),
      }),
    },
  },
];
