import { z } from "zod";
import { EndpointDetails } from "@shared/docs/readme-types";
import {
  ResponseFullSchema,
  ResponseSmallSchema,
} from "./dtos/institute-response.dto";

export const InstituteDocs: EndpointDetails[] = [
  {
    category: "Institute",
    title: "Get institute",
    method: "GET",
    endpoint: "/institute",
    description: "Get details about one specific institute",
    query: z.object({
      id: z.string().describe("institute id"),
    }),
    response: {
      message: "Institute fetched.",
      data: z.object({
        institute: ResponseFullSchema,
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
        institutes: z.array(ResponseSmallSchema),
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
        institutes: z.array(ResponseSmallSchema),
      }),
    },
  },
];
