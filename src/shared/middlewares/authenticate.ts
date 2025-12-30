import client from "@config/cache";
import { AppError } from "@shared/errors/app-error";
import { SocketUserService } from "@shared/services/socket-user.service";
import { TokenService } from "@shared/services/token.service";
import { NextFunction, Request, Response } from "express";
import { ExtendedError, Socket } from "socket.io";

const authenticateRequest = async (
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

const authenticateSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const authToken =
    socket.handshake.headers?.["authtoken"] ??
    socket.handshake.auth.token ??
    null;
  socket.data.authToken = authToken;

  try {
    const decoded = await TokenService.verifyToken(authToken);
    socket.data.user = decoded;
    await SocketUserService.mapUserToSocket(socket);
  } catch {}

  next();
};

export const authenticate = {
  req: authenticateRequest,
  socket: authenticateSocket,
};
