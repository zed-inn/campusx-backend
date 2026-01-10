import { Response } from "express";

export class ApiResponse {
  static success = (
    res: Response,
    message: string,
    data: Record<string, unknown> | null = null
  ) => {
    return res.status(200).json({ message, ...(data ? { data } : {}) });
  };

  static created = (
    res: Response,
    message: string,
    data: Record<string, unknown> | null = null
  ) => {
    return res.status(201).json({ message, ...(data ? { data } : {}) });
  };

  static failure = (
    res: Response,
    message: string,
    data: Record<string, unknown> | null = null
  ) => {
    return res.status(400).json({ message, ...(data ? { data } : {}) });
  };
}

export class SockRes {
  static data = (
    message: string,
    data: Record<string, unknown> | null = null
  ) => {
    return { message, data };
  };
}
