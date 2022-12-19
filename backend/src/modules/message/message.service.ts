import { plainToClass } from 'class-transformer';
import { Message } from './../../entities/message.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageInputDto, MessageOutputDto, RoomDto } from './message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(data: MessageInputDto) {
    const message = this.messageRepository.create(data);
    await this.messageRepository.save(message);

    return plainToClass(MessageOutputDto, message, {
      excludeExtraneousValues: true,
    });
  }

  async getAll() {
    const messages = await this.messageRepository.find({
      relations: ['sender', 'recipient'],
    });

    return messages.map((message) =>
      plainToClass(MessageOutputDto, message, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async getMessageWithPartner(data: RoomDto) {
    const messages = await this.messageRepository.find({
      where: [
        {
          sender: {
            id: data.senderId,
          },
          recipient: {
            id: data.recipientId,
          },
        },
        {
          sender: {
            id: data.recipientId,
          },
          recipient: {
            id: data.senderId,
          },
        },
      ],
      relations: ['sender', 'recipient'],
    });

    return messages.map((message) =>
      plainToClass(MessageOutputDto, message, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
