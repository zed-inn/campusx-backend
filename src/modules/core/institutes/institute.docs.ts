import { z } from "zod";
import { EndpointDetails } from "@shared/utils/readme-types";
import { InstituteResponseSchema } from "./dtos/controller/institute-response.dto";

export const InstituteDocs: EndpointDetails[] = [
  {
    category: "Institute",
    title: "Get institute",
    method: "GET",
    endpoint: "/institute",
    description: "Get details about one specific institute",
    query: z.object({
      id: z.string(),
    }),
    response: {
      message: "Institute fetched.",
      data: z.object({
        institute: InstituteResponseSchema,
      }),
    },
  },
  {
    category: "Institute",
    title: "Get all institutes",
    method: "GET",
    endpoint: "/institute/all",
    description: "Get institutes arranged in descending order per updateDate",
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Institutes fetched.",
      data: z.object({
        institute: InstituteResponseSchema,
      }),
    },
  },
  {
    category: "Institute",
    title: "Get random institutes",
    method: "GET",
    endpoint: "/institute/random",
    description: "Get random list of institutes",
    response: {
      message: "Institutes fetched.",
      data: z.object({
        institute: InstituteResponseSchema,
      }),
    },
  },
];
