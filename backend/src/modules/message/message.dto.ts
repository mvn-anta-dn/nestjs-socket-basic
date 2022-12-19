import { User } from 'src/entities/user.entity';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserOutputDto } from '../user/user.dto';

export class MessageInputDto {
  @IsString()
  message: string;

  @IsString()
  fromUserId: string;

  @IsString()
  toUserId: string;
}

export class MessageOutputDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => UserOutputDto)
  sender: User;

  @Expose()
  @Type(() => UserOutputDto)
  recipient: User;
}

export class RoomDto {
  senderId: string;

  recipientId: string;
}
