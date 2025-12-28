import { z } from "zod";
import { EndpointDetails } from "@shared/docs/readme-types";
import { ProfileResMin } from "@modules/core/profile";
import { AmbassadorResponseSchema } from "./dtos/controller/ambassador-response.dto";

export const AmbassadorDocs: EndpointDetails[] = [
  {
    category: "Ambassador",
    title: "Get request info",
    method: "GET",
    endpoint: "/ambassador",
    description:
      "Get ambassador request info, like status (PENDING, REJECTED or ACCEPTED), and institute info",
    authTokenReq: true,
    response: {
      message: "Request Info.",
      data: z.object({
        request: AmbassadorResponseSchema,
      }),
    },
  },
  {
    category: "Ambassador",
    title: "Get institute's ambassadors",
    method: "GET",
    endpoint: "/ambassador",
    description: "Get users that are ambassadors of an institute",
    query: z.object({
      id: z.string().describe("Institute Id"),
      page: z.number(),
    }),
    response: {
      message: "Ambassadors.",
      data: z.object({
        ambassadors: z.array(ProfileResMin),
      }),
    },
  },
  {
    category: "Ambassador",
    title: "Request for ambassador position",
    method: "POST",
    endpoint: "/ambassador",
    description: "Request for an ambassador position",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("Institute Id"),
      reasonToBecome: z.string().nullable(),
    }),
    response: {
      message: "Request Filled.",
    },
  },
  {
    category: "Ambassador",
    title: "Update ambassador request",
    method: "PUT",
    endpoint: "/ambassador",
    description: "Udpate the request given for ambassador position",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("Institute Id"),
      reasonToBecome: z.string().nullable(),
    }),
    response: {
      message: "Request Updated.",
    },
  },
  {
    category: "Ambassador",
    title: "Withdraw Request",
    method: "DELETE",
    endpoint: "/ambassador",
    description: "Delete the request for an ambassador position",
    authTokenReq: true,
    response: {
      message: "Request Withdrawn.",
    },
  },
];
