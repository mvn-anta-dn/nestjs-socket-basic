import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketUser } from './socket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;
  private users = [];

  @SubscribeMessage('joinUser')
  handleJoinUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() user: SocketUser,
  ) {
    const temp = this.users.map((item) => item.id);
    if (temp.includes(user.id)) {
      this.users.map((item) => {
        if (item.id == user.id) return (item.socketId = socket.id);
      });
    } else {
      this.users.push({
        id: user.id,
        socketId: socket.id,
      });
    }
  }

  @SubscribeMessage('addMessage')
  handleAddMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() msg: any,
  ): void {
    const user = this.users.find((user) => user.id === msg.toUserId);
    console.log(this.users, user);
    user && this.server.to(`${user.socketId}`).emit('addMessage', msg);
  }
}
