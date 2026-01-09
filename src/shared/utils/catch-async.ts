import { Request, Response, NextFunction } from "express";
import { Socket } from "socket.io";

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const catchAsyncSocket = (socket: Socket, fn: Function) => {
  return async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (err) {
      console.log(err);
      socket.emit("error", "Internal server error");
    }
  };
};
