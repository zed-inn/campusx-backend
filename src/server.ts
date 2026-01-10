import http from "http";
import app from "./app";
import { env } from "@config/env";
import { connectDB, disconnectDB } from "@config/database";
import { connectRedis, disconnectRedis } from "@config/cache";
import { SocketService } from "@shared/services/socket.service";
import { defineHooks } from "@shared/hooks/hooks";
import { generateDocs } from "@shared/app.docs";

const httpServer = http.createServer(app);

const startServer = async () => {
  generateDocs(); // before server starts

  const dbConnected = await connectDB(defineHooks);
  const cacheConnected = await connectRedis();

  SocketService.init(httpServer);

  httpServer.listen(env.PORT, env.HOST, () => {
    console.log(`
Server running on port ${env.PORT}
Env: ${env.NODE_ENV}
Socket.io: Enabled
Database: ${dbConnected ? "Connected" : "Not Connected"}
Redis: ${cacheConnected ? "Connected" : "Not Connected"}
`);
  });
};

startServer();

const shutdown = async (signal: string) => {
  try {
    console.log(`\n${signal} received. Starting graceful shutdown...`);

    if (SocketService.io) {
      SocketService.io.close(() => {
        console.log("Socket.io closed.");
      });
    }

    httpServer.close(() => {
      console.log("HTTP Server closed.");
    });

    await disconnectDB(() => {
      console.log("Database closed.");
    });
    await disconnectRedis(() => {
      console.log("Cache closed.");
    });

    console.log("Shutdown successfull!");
    process.exit(0);
  } catch (err) {
    console.log("Some error occured :", err);
    process.exit(1);
  }
};

{
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("SIGUSR2", async () => {
    await shutdown("SIGUSR2");
    process.kill(process.pid, "SIGUSR2");
  });

  process.on("unhandledRejection", (err: Error) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    shutdown("UNHANDLED_REJECTION");
  });

  process.on("uncaughtException", (err: Error) => {
    console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
  });
}
