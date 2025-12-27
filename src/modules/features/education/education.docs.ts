import { z } from "zod";
import { EducationResponseSchema } from "./dtos/controller/education-response.dto";
import { EducationCreateSchema } from "./dtos/service/education-create.dto";
import { EducationUpdateSchema } from "./dtos/service/education-update.dto";
import { ProfileResMin } from "@modules/core/profile";
import { EndpointDetails } from "@shared/docs/readme-types";

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
        educations: z.array(EducationResponseSchema),
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
        students: z.array(ProfileResMin),
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
        education: EducationResponseSchema,
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
        education: EducationResponseSchema,
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
        education: EducationResponseSchema,
      }),
    },
  },
];
