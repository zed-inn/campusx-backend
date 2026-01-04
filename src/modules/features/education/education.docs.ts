import { z } from "zod";
import { EducationCreateSchema } from "./dtos/education-create.dto";
import { EducationUpdateSchema } from "./dtos/education-update.dto";
import { EndpointDetails } from "@shared/docs/readme-types";
import {
  ResponseFullSchema,
  ResponseShortSchema,
} from "./dtos/education-response.dto";
import { ProfileResponseShort } from "@modules/core/profile";

export const EducationDocs: EndpointDetails[] = [
  {
    category: "Education",
    title: "Get user's education",
    method: "GET",
    endpoint: "/education",
    description: "Get education list of a specific user",
    query: z.object({
      id: z.string().describe("user id"),
      page: z.number(),
    }),
    response: {
      message: "User's education.",
      data: z.object({
        educations: z.array(ResponseFullSchema),
      }),
    },
  },
  {
    category: "Institute",
    title: "Get institute students",
    method: "GET",
    endpoint: "/education/students",
    description: "Get students list of an institute, whether passed or ongoing",
    query: z.object({
      id: z.string().describe("institute id"),
      page: z.number(),
    }),
    response: {
      message: "Institute's students.",
      data: z.object({
        students: z.array(ProfileResponseShort),
      }),
    },
  },
  {
    category: "Education",
    title: "Add education",
    method: "POST",
    endpoint: "/education",
    description: "Add institute and relevant details as your education",
    authTokenReq: true,
    body: EducationCreateSchema,
    response: {
      message: "Education added.",
      data: z.object({
        education: ResponseShortSchema,
      }),
    },
  },
  {
    category: "Education",
    title: "Update education",
    method: "PUT",
    endpoint: "/education",
    description: "Update relevant details of your education",
    authTokenReq: true,
    body: EducationUpdateSchema,
    response: {
      message: "Education updated.",
      data: z.object({
        education: ResponseShortSchema,
      }),
    },
  },
  {
    category: "Education",
    title: "Remove education",
    method: "DELETE",
    endpoint: "/education",
    description: "Remove an education",
    authTokenReq: true,
    query: z.object({
      id: z.string().describe("education id"),
    }),
    response: {
      message: "Education removed.",
      data: z.object({
        education: ResponseShortSchema,
      }),
    },
  },
];
