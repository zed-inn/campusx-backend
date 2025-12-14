import { TokenService } from "@shared/services/token.service";
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
  req.authToken = authToken;

  try {
    const decoded = await TokenService.verifyToken(authToken);
    req.user = decoded;
  } catch {}

  next();
};
