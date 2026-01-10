import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { authenticate } from "@shared/middlewares/authenticate";
import { SocketRouter } from "@shared/socket.router";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

class _SocketService {
  private _io: Server | null = null;

  public init(httpServer: HttpServer) {
    this._io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this._io.use(authenticate.socket);

    this._io.on("connection", (socket: Socket) => {
      const user = AuthPayloadSchema.parse(socket.data.user);
      socket.join(`user:${user.id}`);

      console.log(`Client connected: ${socket.id}`);

      SocketRouter(socket);
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
    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  }

  /** Utils */
  public u = new SocketUtils(this);
}

class SocketUtils {
  private socketService: _SocketService;

  constructor(socketService: _SocketService) {
    this.socketService = socketService;
  }

  public sendTo = (userId: string, eventName: string, ...args: any[]) => {
    return this.socketService.io.to(`user:${userId}`).emit(eventName, ...args);
  };
}

export const SocketService = new _SocketService();
