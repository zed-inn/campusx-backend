import { ZodObject, ZodType } from "zod";

export type EndpointDetails = {
  category: string;
  title: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description: string;
  authTokenReq?: boolean;
  body?: ZodObject;
  query?: ZodObject;
  response: {
    message: string;
    data?: ZodObject;
  };
};
