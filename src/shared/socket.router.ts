import { MessageSocketController } from "@modules/features/chats";
import { Socket } from "socket.io";

export const SocketRouter = (socket: Socket) => {
  MessageSocketController(socket);
};
