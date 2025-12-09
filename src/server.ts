import http from "http";
import app from "./app";
import { env } from "@config/env";
import { connectDB, disconnectDB } from "@config/database";
import { connectRedis, disconnectRedis } from "@config/cache";
import { socketService } from "@shared/services/socket.service";

const httpServer = http.createServer(app);

const startServer = async () => {
  const dbConnected = await connectDB();
  const cacheConnected = await connectRedis();

  socketService.init(httpServer);

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
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  if (socketService.io) {
    socketService.io.close(() => {
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
};

{
  // Ctrl+C (Terminal)
  process.on("SIGINT", () => shutdown("SIGINT"));

  // Kill command (Docker/Kubernetes stops container)
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  // Nodemon restart signal
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
