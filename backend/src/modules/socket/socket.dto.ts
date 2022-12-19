import { IsString } from 'class-validator';

export class SocketUser {
  @IsString()
  id: string;

  @IsString()
  socketId: string;
}

export class SendMessageDto {}
