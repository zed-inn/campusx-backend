import client from "@config/cache";
import { Socket } from "socket.io";

export class SocketUserService {
  static mapUserToSocket = async (socket: Socket) => {
    if (socket.data.user && socket.data.user.id)
      await client.set(`socket-user:${socket.data.user.id}`, socket.id);
  };

  static unmapUserToSocket = async (socket: Socket) => {
    await client.del(`socket-user:${socket.data?.user?.id}`);
  };

  static getSocketIdMapped = async (userId: string) => {
    const socketId = await client.get(`socket-user:${userId}`);
    return socketId;
  };
}
