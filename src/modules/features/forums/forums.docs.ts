import { z } from "zod";
import { EndpointDetails } from "@shared/docs/readme-types";
import { ForumResponseSchema } from "./dtos/controller/forum-response.dto";
import { ForumCreateSchema } from "./dtos/service/forum-create.dto";
import { ForumUpdateSchema } from "./dtos/service/forum-update.dto";
import { CommentResponseSchema } from "./dtos/controller/comment-response.dto";
import { CommentCreateSchema } from "./dtos/service/comment-create.dto";
import { CommentUpdateSchema } from "./dtos/service/comment-update.dto";

export const ForumDocs: EndpointDetails[] = [
  {
    category: "Forum",
    title: "Get user's forums",
    method: "GET",
    endpoint: "/forums",
    description: "Get forums of a specified user",
    query: z.object({
      id: z.string().describe("user id"),
      page: z.number(),
    }),
    response: {
      message: "Forums fetched.",
      data: z.object({
        forums: z.array(ForumResponseSchema),
      }),
    },
  },
  {
    category: "Forum",
    title: "Get forums (latest)",
    method: "GET",
    endpoint: "/forums/latest",
    description: "Get latest forums, will be upgraded to recommended forums",
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Forums fetched.",
      data: z.object({
        forums: z.array(ForumResponseSchema),
      }),
    },
  },
  {
    category: "Forum",
    title: "Get my forums",
    method: "GET",
    endpoint: "/forums/me",
    description: "Get forums of the currently logged in user",
    authTokenReq: true,
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Forums fetched.",
      data: z.object({
        forums: z.array(ForumResponseSchema),
      }),
    },
  },
  {
    category: "Forum",
    title: "Create forum",
    method: "POST",
    endpoint: "/forums",
    description: "Creates a forum",
    authTokenReq: true,
    body: ForumCreateSchema,
    response: {
      message: "Forum created.",
      data: z.object({
        forum: ForumResponseSchema,
      }),
    },
  },
  {
    category: "Forum",
    title: "Update forum",
    method: "PUT",
    endpoint: "/forums",
    description: "Updates a forum",
    authTokenReq: true,
    body: ForumUpdateSchema,
    response: {
      message: "Forum udpated.",
      data: z.object({
        forum: ForumResponseSchema,
      }),
    },
  },
  {
    category: "Forum",
    title: "Delete forum",
    method: "DELETE",
    endpoint: "/forums",
    description: "Deletes a forum",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("forum id"),
    }),
    response: {
      message: "Forum deleted.",
      data: z.object({
        forum: ForumResponseSchema,
      }),
    },
  },
  {
    category: "Forum",
    title: "Like forum",
    method: "POST",
    endpoint: "/forums/like",
    description: "Likes a forum",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("forum id"),
    }),
    response: {
      message: "Liked.",
    },
  },
  {
    category: "Forum",
    title: "Unlike forum",
    method: "POST",
    endpoint: "/forums/unlike",
    description: "Unlikes a forum",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("forum id"),
    }),
    response: {
      message: "Unliked.",
    },
  },
  {
    category: "Forum",
    title: "Report forum",
    method: "POST",
    endpoint: "/forums/report",
    description: "Reports a forum by a currently logged in user",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("forum id"),
      reason: z.string(),
    }),
    response: {
      message: "Reported.",
    },
  },
  {
    category: "Forum Comment",
    title: "Get comments/replies",
    method: "GET",
    endpoint: "/forums/comments",
    description: "Get comments on a forum, or replies on a comment of a forum",
    query: z.object({
      forumId: z.string(),
      commentId: z.string().nullable(),
      page: z.number(),
    }),
    response: {
      message: "Comments fetched.",
      data: z.object({
        comments: z.array(CommentResponseSchema),
      }),
    },
  },
  {
    category: "Forum Comment",
    title: "Comment/reply",
    method: "POST",
    endpoint: "/forums/comments",
    description: "Comment on a forum, or reply on a comment",
    body: CommentCreateSchema,
    response: {
      message: "Commented.",
      data: z.object({
        comment: CommentResponseSchema,
      }),
    },
  },
  {
    category: "Forum Comment",
    title: "Update comment/reply",
    method: "PUT",
    endpoint: "/forums/comments",
    description: "Update your comment/reply on a forum/comment",
    body: CommentUpdateSchema,
    response: {
      message: "Comment updated.",
      data: z.object({
        comment: CommentResponseSchema,
      }),
    },
  },
  {
    category: "Forum Comment",
    title: "Delete comment/reply",
    method: "DELETE",
    endpoint: "/forums/comments",
    description: "Deletes your comment/reply on a forum/comment",
    query: z.object({
      id: z.string().describe("comment id"),
    }),
    response: {
      message: "Comment deleted.",
      data: z.object({
        comment: CommentResponseSchema,
      }),
    },
  },
];
