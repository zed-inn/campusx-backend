import { createEnum } from "@shared/utils/create-enum";

export const UPLOAD = {
  MIME_TYPES: {
    ALLOWED: createEnum([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ] as const),
  },
  IMAGE: {
    SIZE: { MAX: { KB: 30 } },
    QUALITY: { MIN: 55, MAX: 100 },
  },
};
