import { Module } from '@nestjs/common';
import { SocketModule } from './modules/socket/socket.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceConfig from './shared/configs/data-source.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig.options),
    SocketModule,
    UserModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
