import { z } from "zod";
import { EndpointDetails } from "@shared/utils/readme-types";
import { EducationResponseSchema } from "./dtos/controller/education-response.dto";
import { ProfileResponseMinSchema as ResMinProfile } from "@modules/core/profile/dtos/controller/profile-response.dto";
import { EducationCreateSchema } from "./dtos/service/education-create.dto";
import { EducationUpdateSchema } from "./dtos/service/education-update.dto";

export const EducationDocs: EndpointDetails[] = [
  {
    category: "Education",
    title: "Get user's education",
    method: "GET",
    endpoint: "/education",
    description: "Get education list of a specific user",
    query: z.object({
      id: z.string(),
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
    endpoint: "/educations/students",
    description: "Get students list of an institute, whether passed or ongoing",
    query: z.object({
      id: z.string(),
      page: z.number(),
    }),
    response: {
      message: "Institute's students.",
      data: z.object({
        students: z.array(ResMinProfile),
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
      data: EducationResponseSchema,
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
      data: EducationResponseSchema,
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
      id: z.string(),
    }),
    response: {
      message: "Education removed.",
      data: EducationResponseSchema,
    },
  },
];
