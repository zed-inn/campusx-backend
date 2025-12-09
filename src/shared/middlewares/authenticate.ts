import { TokenService } from "@shared/services/token.service";
import { catchAsync } from "@shared/utils/catch-async";
import { NextFunction, Request, Response } from "express";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken =
    req.headers["authorization"]?.split(" ")?.[1] ??
    req.headers["authtoken"] ??
    req.cookies["authtoken"] ??
    null;

  try {
    const decoded = await TokenService.verifyToken(authToken);
    req.user = decoded;
    req.authToken = authToken;
  } catch {}

  next();
};
