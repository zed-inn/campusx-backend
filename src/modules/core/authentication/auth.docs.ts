import { EndpointDetails } from "@shared/docs/readme-types";
import { z } from "zod";
import { LoginBasicSchema } from "./login/dtos/login-basic.dto";
import { AuthResponseSchema } from "./dtos/auth-response.dto";
import { LoginGoogleSchema } from "./login/dtos/login-google.dto";
import { VerifyOtpSchema } from "./otp/dtos/otp-verify.dto";
import { CreatePasswordSchema } from "./register/dtos/register.dto";

export const AuthDocs: EndpointDetails[] = [
  {
    category: "Login",
    title: "Basic: email and password",
    method: "POST",
    endpoint: "/auth/login/basic",
    description: "Login with email and password",
    body: LoginBasicSchema,
    response: {
      message: "Logged in.",
      data: AuthResponseSchema,
    },
  },
  {
    category: "Login",
    title: "Google",
    method: "POST",
    endpoint: "/auth/login/google",
    description: "Login with google from flutter screen",
    body: LoginGoogleSchema,
    response: {
      message: "Logged in.",
      data: AuthResponseSchema,
    },
  },
  {
    category: "OTP",
    title: "Get otp",
    method: "POST",
    endpoint: "/auth/otp/get",
    description: "Get Otp to desired mail to verify it",
    body: z.object({
      email: z.email(),
    }),
    response: {
      message: "Otp sent.",
    },
  },
  {
    category: "OTP",
    title: "Verify otp",
    method: "POST",
    endpoint: "/auth/otp/verify",
    description: "Verify the 'sent' Otp to the given mail in previous step",
    body: VerifyOtpSchema,
    response: {
      message: "Otp verified.",
      data: z.object({
        otpToken: z.string(),
      }),
    },
  },
  {
    category: "Signup",
    title: "Create password",
    method: "POST",
    endpoint: "/auth/signup/create-password",
    description: "Create password after getting and verifying otp",
    body: CreatePasswordSchema,
    response: {
      message: "Signed up.",
      data: AuthResponseSchema,
    },
  },
  {
    category: "Forgot Password",
    title: "Reset password",
    method: "POST",
    endpoint: "/auth/forgot-password/reset-password",
    description: "Reset password after getting and verifying otp",
    body: CreatePasswordSchema,
    response: {
      message: "Password resetted.",
    },
  },
  {
    category: "Logout",
    title: "Logout",
    method: "GET",
    endpoint: "/auth/logout",
    description:
      "Logouts the current logged in user\nMakes the <authToken> lose its authorization",
    response: {
      message: "Logged out.",
    },
  },
];
