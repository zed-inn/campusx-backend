import { AppError } from "@shared/errors/app-error";

export const converTOrder = (val: string) => {
  const order = JSON.parse(val) as string[][];
  if (!Array.isArray(order)) return [];
  for (const x of order) {
    if (x.length !== 2) return [];
    for (const y of x) if (typeof y !== "string") return [];
  }

  return order;
};
