import { Router } from "express";

export const mount = (endpoint: string, router: Router) => {
  const r = Router();
  r.use(endpoint, router);
  return r;
};
