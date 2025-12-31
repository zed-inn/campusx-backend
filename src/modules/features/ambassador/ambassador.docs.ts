import { z } from "zod";
import { EndpointDetails } from "@shared/docs/readme-types";
import { ProfileResponseShort } from "@modules/core/user-profile";
import { ResponseFullSchema } from "./dtos/ambassador-response.dto";

export const AmbassadorDocs: EndpointDetails[] = [
  {
    category: "Ambassador",
    title: "Get request info",
    method: "GET",
    endpoint: "/ambassador/request",
    description:
      "Get ambassador request info, like status (PENDING, REJECTED or ACCEPTED), and institute info",
    authTokenReq: true,
    response: {
      message: "Request Info.",
      data: z.object({
        request: ResponseFullSchema,
      }),
    },
  },
  {
    category: "Ambassador",
    title: "Get institute's ambassadors",
    method: "GET",
    endpoint: "/ambassador/institute",
    description: "Get users that are ambassadors of an institute",
    query: z.object({
      id: z.string().describe("Institute Id"),
      page: z.number(),
    }),
    response: {
      message: "Ambassadors.",
      data: z.object({
        ambassadors: z.array(ProfileResponseShort),
      }),
    },
  },
  {
    category: "Ambassador",
    title: "Request for ambassador position",
    method: "POST",
    endpoint: "/ambassador/request",
    description: "Request for an ambassador position",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("Institute Id"),
      reason: z.string().nullable(),
    }),
    response: {
      message: "Request Filled.",
    },
  },
  {
    category: "Ambassador",
    title: "Update ambassador request",
    method: "PUT",
    endpoint: "/ambassador/request",
    description: "Udpate the request given for ambassador position",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("Institute Id"),
      reason: z.string().nullable(),
    }),
    response: {
      message: "Request Updated.",
    },
  },
  {
    category: "Ambassador",
    title: "Withdraw Request",
    method: "DELETE",
    endpoint: "/ambassador/request",
    description: "Delete the request for an ambassador position",
    authTokenReq: true,
    response: {
      message: "Request Withdrawn.",
    },
  },
];
