import { Request } from "express";
import { Socket } from "socket.io";
import { z } from "zod";

const BLACKLIST = [
  "nil.nil",
  "none.com",
  "na.com",
  "nowebsite.com",
  "websiteunderprocess.com",
  "nil.com",
];

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

  static normalizeString = (x: string) => {
    if (typeof x !== "string") return "";

    return x.toLowerCase().replace(/[^\p{L}]+/gu, "");
  };

  static sanitizeUrl = (input: string | null | undefined): string | null => {
    if (!input || typeof input !== "string") return null;

    let candidate = input.trim();

    // 1. Basic Protocol Check (We only allow adding https://, nothing else)
    // If it's just "google.com", we assume https.
    // If it's "google,com", we fail later.
    if (!/^https?:\/\//i.test(candidate)) {
      candidate = `https://${candidate}`;
    }

    try {
      const url = new URL(candidate);
      const hostname = url.hostname;

      // === STRICT RULE 1: CHARACTER WHITELIST ===
      // Domains can ONLY contain: a-z, 0-9, dots (.), and hyphens (-).
      // ANY other character (underscore _, comma ,, quote ', space) -> REJECT.
      if (/[^a-zA-Z0-9.-]/.test(hostname)) {
        return null;
      }

      // === STRICT RULE 2: STRUCTURAL INTEGRITY ===
      // Reject double dots (site..com)
      if (hostname.includes("..")) return null;

      // Reject leading/trailing dots or hyphens (.site.com or site-.com)
      if (hostname.startsWith(".") || hostname.endsWith(".")) return null;
      if (hostname.startsWith("-") || hostname.endsWith("-")) return null;

      // Reject hyphens touching dots (.- or -.)
      if (hostname.includes(".-") || hostname.includes("-.")) return null;

      // === STRICT RULE 3: TLD VALIDATION ===
      // Must look like a real domain ending (.com, .in, .org)
      // Rejects: "localhost", "192.168.1.1", "google.c", "site.123"
      const parts = hostname.split(".");

      // Must have at least domain + TLD (google.com)
      if (parts.length < 2) return null;

      // TLD must be only letters and at least 2 chars
      const tld = parts[parts.length - 1];
      if (!/^[a-zA-Z]{2,}$/.test(tld as string)) return null;

      // If "www" is present, ensure there are 3 parts (www.google.com)
      if (parts[0] === "www" && parts.length < 3) return null;

      // === FINAL CHECK: ZOD ===
      // Double check with standard library
      const result = z.url().safeParse(url.href);

      return result.success ? result.data : null;
    } catch (e) {
      // If URL parsing failed for any reason -> REJECT
      return null;
    }
  };
}
