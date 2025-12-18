import { Request } from "express";
import { Socket } from "socket.io";

export class Sanitize {
  static keysToMask = [
    "password",
    "token",
    "accessToken",
    "refreshToken",
    "authorization",
    "cookie",
    "authToken",
    "auth_token",
    "fcmToken",
    "fcm_token",
  ];

  static maskSensitive(obj: any, keysToMask: string[] = this.keysToMask): any {
    if (!obj || typeof obj !== "object") return obj;

    const out: any = Array.isArray(obj) ? [] : {};

    for (const k of Object.keys(obj)) {
      try {
        const v = obj[k];

        if (keysToMask.includes(k.toLowerCase())) {
          out[k] = "<<masked>>";
        } else if (v && typeof v === "object") {
          out[k] = this.maskSensitive(v, keysToMask);
        } else {
          out[k] = v;
        }
      } catch (e) {
        out[k] = "[unserializable]";
      }
    }
    return out;
  }

  static sanitizeReq(req: Request) {
    if (!req) return null;

    const user = req.user;

    return {
      method: req.method,
      url: req.originalUrl || req.url,
      path: req.path,
      headers: this.maskSensitive(req.headers || {}),
      query: this.maskSensitive(req.query || {}),
      params: this.maskSensitive(req.params || {}),
      body: req.body ? this.maskSensitive(req.body) : undefined,
      ip: req.ip,
      user: user ? { id: user.id, role: user.role } : undefined,
      timestamp: new Date().toISOString(),
    };
  }

  static normalizeError(err: any) {
    if (!err) return null;

    if (typeof err !== "object") {
      return { message: String(err) };
    }

    return {
      name: err.name || "Error",
      message: err.message || "Unknown error",
      stack:
        typeof err.stack === "string"
          ? err.stack.substring(0, 5000)
          : undefined,
      code: err.code || err.status || err.statusCode,
      errors: err.errors,
      meta: err.meta,
    };
  }

  static sanitizeSocket(socket: Socket) {
    if (!socket) return null;

    return {
      id: socket.id,
      handshakeData: {
        headers: this.maskSensitive(socket.handshake.headers || {}),
        query: this.maskSensitive(socket.handshake.query || {}),
        auth: this.maskSensitive(socket.handshake.auth || {}),
      },
      ip: socket.handshake.address,
      timestamp: new Date().toISOString(),
    };
  }
}
