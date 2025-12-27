import { z } from "zod";
import {
  ProfileResponseMaxSchema as ResMax,
  ProfileResponseMinSchema as ResMin,
} from "./dtos/controller/profile-response.dto";
import { ProfileCreateSchema } from "./dtos/service/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/service/profile-update.dto";
import { EndpointDetails } from "@shared/docs/readme-types";

export const ProfileDocs: EndpointDetails[] = [
  {
    category: "Profile",
    title: "Get user's profile",
    method: "GET",
    endpoint: "/user/profile",
    description: "Gets user's display attributes, like dob, name, etc.",
    query: z.object({
      id: z.string().describe("user id"),
    }),
    response: {
      message: "Profile fetched.",
      data: z.object({
        profile: ResMax,
      }),
    },
  },
  {
    category: "User",
    title: "Get users",
    method: "GET",
    endpoint: "/user/all",
    description: "Get all users.",
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Users fetched.",
      data: z.object({
        users: z.array(ResMin),
      }),
    },
  },
  {
    category: "Profile",
    title: "Get my profile",
    method: "GET",
    endpoint: "/user/profile/me",
    description: "Get the profile of currently logged in user",
    authTokenReq: true,
    response: {
      message: "Profile fetched.",
      data: z.object({
        profile: ResMax,
      }),
    },
  },
  {
    category: "Profile",
    title: "Create profile (after signup)",
    method: "POST",
    endpoint: "/user/profile",
    description: "Create profile for the user after signing up",
    authTokenReq: true,
    body: ProfileCreateSchema,
    response: {
      message: "Profile created.",
      data: z.object({
        profile: ResMax,
      }),
    },
  },
  {
    category: "Profile",
    title: "Update profile",
    method: "PUT",
    endpoint: "/user/profile",
    description:
      "Update profile of currently logged in user\nOnly updates the fields sent\nDoes not update if no fields given",
    authTokenReq: true,
    body: ProfileUpdateSchema,
    response: {
      message: "Profile updated.",
      data: z.object({
        profile: ResMax,
      }),
    },
  },
  {
    category: "Follow",
    title: "Get user's followers",
    method: "GET",
    endpoint: "/user/followers",
    description: "Get followers of a user with their id",
    query: z.object({
      id: z.string().describe("user id"),
      page: z.number(),
    }),
    response: {
      message: "User's followers.",
      data: z.object({
        followers: z.array(ResMin),
      }),
    },
  },
  {
    category: "Follow",
    title: "Get my followers",
    method: "GET",
    endpoint: "/user/followers/me",
    description: "Get followers of currently logged in user",
    authTokenReq: true,
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Your followers.",
      data: z.object({
        followers: z.array(ResMin),
      }),
    },
  },
  {
    category: "Follow",
    title: "Get user's following",
    method: "GET",
    endpoint: "/user/following",
    description: "Get follwoings of a user with thier id",
    query: z.object({
      id: z.string().describe("user id"),
      page: z.number(),
    }),
    response: {
      message: "User's following.",
      data: z.object({
        followers: z.array(ResMin),
      }),
    },
  },
  {
    category: "Follow",
    title: "Get my following",
    method: "GET",
    endpoint: "/user/following/me",
    description: "Get following of currently logged in user",
    authTokenReq: true,
    query: z.object({
      page: z.number(),
    }),
    response: {
      message: "Your following.",
      data: z.object({
        followers: z.array(ResMin),
      }),
    },
  },
  {
    category: "Follow",
    title: "Follow user",
    method: "POST",
    endpoint: "/user/follow",
    description: "Follow a user",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("user id"),
    }),
    response: {
      message: "Followed.",
    },
  },
  {
    category: "Follow",
    title: "Unfollow user",
    method: "POST",
    endpoint: "/user/unfollow",
    description: "Unfollow a user",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("user id"),
    }),
    response: {
      message: "Unfollowed.",
    },
  },
  {
    category: "User",
    title: "Report user",
    method: "POST",
    endpoint: "/user/report",
    description: "Report a user with reason",
    authTokenReq: true,
    body: z.object({
      id: z.string().describe("user id"),
      reason: z.string(),
    }),
    response: {
      message: "Reported.",
    },
  },
];
