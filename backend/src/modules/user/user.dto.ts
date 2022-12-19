import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserInputDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UserOutputDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}
