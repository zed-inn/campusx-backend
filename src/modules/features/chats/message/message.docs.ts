import { EndpointDetails } from "@shared/docs/readme-types";
import { array, z } from "zod";
import {
  MessageCreateSchema,
  MessageReceivedSchema,
  MessageUpdateSchema,
} from "./dtos/message-action.dto";
import { MessageChatSchema, MessageSchema } from "./dtos/message-response.dto";

export const MessageSocketDocs: EndpointDetails[] = [
  {
    category: "Messaging",
    title: "[Server] [ChatId] Send Message",
    endpoint: "chat:message-to",
    method: "socket",
    description:
      "Send message to server using usedId and the server will forward to users appropriately, A callback is needed for sending user",
    authTokenReq: true,
    body: z.object({
      payload: MessageCreateSchema,
      callback: z
        .any()
        .describe("Callback function to act as response for client"),
    }),
    response: {
      message: "Message received on server",
      data: z.object({ message: MessageSchema }),
    },
  },
  {
    category: "Messaging",
    title: "[Server] [UserId] Send Message",
    endpoint: "chat:message-to",
    method: "socket",
    description: "Send message to server using chatId",
    authTokenReq: true,
    body: z.object({
      payload: MessageCreateSchema,
      callback: z
        .any()
        .describe("Callback function to act as response for client"),
    }),
    response: {
      message: "Message received on server",
      data: z.object({ message: MessageChatSchema }),
    },
  },
  {
    category: "Messaging",
    title: "[Client] [ChatId] Send Message",
    endpoint: "chat:message-from",
    method: "socket",
    description:
      "Send Message to user that has been received by server using chatId",
    authTokenReq: false,
    response: {
      message: "Someone sent you a message",
      data: z.object({ message: MessageSchema }),
    },
  },
  {
    category: "Messaging",
    title: "[Client] [UserId] Send Message",
    endpoint: "chat:message-from",
    method: "socket",
    description:
      "Send Message to user that has been received by server using userId",
    authTokenReq: false,
    response: {
      message: "Someone sent you a message",
      data: z.object({ message: MessageChatSchema }),
    },
  },
  {
    category: "Messaging",
    title: "[Server] Message Recieved",
    endpoint: "chat:message-received",
    method: "socket",
    description:
      "Send message received if you have received a message from endpoint `chat:message-from` or `chat:message-update-to",
    authTokenReq: true,
    body: z.object({
      payload: MessageReceivedSchema,
      callback: z
        .any()
        .describe("Callback function to act as response for client"),
    }),
    response: {
      message: "Message received on server",
      data: z.object({ message: array(MessageSchema) }),
    },
  },
  {
    category: "Messaging",
    title: "[Client] Message Received",
    endpoint: "chat:message-received",
    method: "socket",
    description:
      "Server sends that the message has been received by the other user after `chat:message-to` or `chat:message-update-to`",
    authTokenReq: false,
    response: {
      message: "Message has been received by the other user",
      data: z.object({ message: array(MessageSchema) }),
    },
  },
  {
    category: "Messaging",
    title: "[Server] Message Update",
    endpoint: "chat:message-update-to",
    method: "socket",
    description: "Update message and gets a response.",
    authTokenReq: true,
    body: z.object({
      payload: MessageUpdateSchema,
      callback: z
        .any()
        .describe("Callback function to act as response for client"),
    }),
    response: {
      message: "Message received on server",
      data: z.object({ message: MessageSchema }),
    },
  },
  {
    category: "Messaging",
    title: "[Client] Message Update From",
    endpoint: "chat:message-update-from",
    method: "socket",
    description: "Gets a message update from other user, server sends it.",
    authTokenReq: false,
    response: {
      message: "Message update from someone",
      data: z.object({ message: MessageSchema }),
    },
  },
];
