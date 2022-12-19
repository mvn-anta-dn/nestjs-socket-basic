import { MessageService } from './message.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageInputDto, RoomDto } from './message.dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  create(@Body() data: MessageInputDto) {
    return this.messageService.create(data);
  }

  @Get()
  getAll() {
    return this.messageService.getAll();
  }

  @Post('room')
  getMessageWithPartner(@Body() data: RoomDto) {
    return this.messageService.getMessageWithPartner(data);
  }
}
