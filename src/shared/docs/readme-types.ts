import { ZodObject } from "zod";

export type EndpointDetails = {
  category: string;
  title: string;
  endpoint: string;
  method: "get" | "post" | "patch" | "delete" | "put" | "socket";
  description: string;
  authTokenReq: boolean;
  query?: ZodObject;
  body?: ZodObject;
  response: {
    message: string;
    data?: ZodObject;
  };
};
