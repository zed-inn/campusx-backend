import { z } from "zod";
import { EndpointDetails } from "@shared/utils/readme-types";
import { DiscussionResponseSchema } from "./dtos/controller/discussion-response.dto";
import { DiscussionCreateSchema } from "./dtos/service/discussion-create.dto";
import { DiscussionUpdateSchema } from "./dtos/service/discussion-update.dto";

export const DiscussionDocs: EndpointDetails[] = [
  {
    category: "Institute Discussion",
    title: "Get messages",
    method: "GET",
    endpoint: "/institute/messages",
    description: "Get messages of an institute discussion",
    query: z.object({
      id: z.string().describe("institute id"),
      page: z.number(),
    }),
    response: {
      message: "Messages fetched.",
      data: z.object({
        messages: z.array(DiscussionResponseSchema),
      }),
    },
  },
  {
    category: "Institute Discussion",
    title: "Create message",
    method: "POST",
    endpoint: "/institute/messages",
    description: "Message in an insitute discussion",
    authTokenReq: true,
    body: DiscussionCreateSchema,
    response: {
      message: "Messaged.",
      data: z.object({
        message: DiscussionResponseSchema,
      }),
    },
  },
  {
    category: "Institute Discussion",
    title: "Update message",
    method: "PUT",
    endpoint: "/institute/messages",
    description: "Udpate your message in an insitute discussion",
    authTokenReq: true,
    body: DiscussionUpdateSchema,
    response: {
      message: "Message updated.",
      data: z.object({
        message: DiscussionResponseSchema,
      }),
    },
  },
  {
    category: "Institute Discussion",
    title: "Delete message",
    method: "DELETE",
    endpoint: "/institute/messages",
    description: "Deletes your message in an insitute discussion",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("message/discussion id"),
    }),
    response: {
      message: "Message deleted.",
      data: z.object({
        message: DiscussionResponseSchema,
      }),
    },
  },
  {
    category: "Institute Discussion",
    title: "Like message",
    method: "POST",
    endpoint: "/institute/messages",
    description: "Like a message in an insitute discussion",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("message/discussion id"),
    }),
    response: {
      message: "Message liked.",
    },
  },
  {
    category: "Institute Discussion",
    title: "Unlike message",
    method: "POST",
    endpoint: "/institute/messages",
    description: "Unlike a liked message in an insitute discussion",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("message/discussion id"),
    }),
    response: {
      message: "Message unliked.",
    },
  },
];
