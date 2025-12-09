import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

class SocketService {
  private _io: Server | null = null;

  public init(httpServer: HttpServer) {
    this._io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this._io.on("connection", (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      this.handleConnection(socket);
    });
  }

  public get io() {
    if (!this._io) {
      throw new Error("Socket.io not initialized!");
    }
    return this._io;
  }

  private handleConnection(socket: Socket) {
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  }
}

export const socketService = new SocketService();
