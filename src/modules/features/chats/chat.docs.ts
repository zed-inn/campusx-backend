import { EndpointDetails } from "@shared/docs/readme-types";
import { z } from "zod";
import { ChatResponseSchema } from "./chat/dtos/chat-response.dto";
import { MessageResponseSchema } from "./messages/dtos/message-response.dto";

export const ChatDocs: EndpointDetails[] = [
  {
    category: "Chat",
    title: "Get Chats",
    method: "GET",
    endpoint: "/chat/all",
    description: "Get chats in order of latest activity",
    authTokenReq: true,
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Chats.",
      data: z.object({
        chats: z.array(ChatResponseSchema),
      }),
    },
  },
  {
    category: "Chat Message",
    title: "Get Messages",
    method: "GET",
    endpoint: "/chat/messages",
    description: "Get latest messages of a specific chat",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("Chat Id"),
      page: z.number(),
    }),
    response: {
      message: "Messages.",
      data: z.object({
        messages: z.array(MessageResponseSchema),
      }),
    },
  },
  {
    category: "Chat Message",
    title: "Get initial messages",
    method: "GET",
    endpoint: "/chat/messages/initial",
    description: "Get initial latest message of all chats",
    authTokenReq: true,
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Messages.",
      data: z.object({
        messages: z.array(MessageResponseSchema),
      }),
    },
  },
];
