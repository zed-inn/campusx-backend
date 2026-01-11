import path from "path";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { AppRouter } from "@shared/router";
import { globalErrorHandler } from "@shared/middlewares/global-error-handler";
import { AppError } from "@shared/errors/app-error";
import { authenticate } from "@shared/middlewares/authenticate";
import { AdminAppRouter } from "@shared/admin.router";

declare global {
  namespace Express {
    interface Request {
      authToken?: string | null;
      user?: {
        id: string;
        role?: string | undefined;
      };
    }
  }
}

const app = express();

// Global Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));

app.use(authenticate.req);

app.use("/", AppRouter);
app.use("/admin", AdminAppRouter.router);

app.use((req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.method.toUpperCase()} ${
        req.originalUrl
      } on this server`,
      404
    )
  );
});

// Global error handler
app.use(globalErrorHandler);

export default app;
