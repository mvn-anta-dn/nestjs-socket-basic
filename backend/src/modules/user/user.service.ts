import { UserInputDto, UserOutputDto } from './user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(data: UserInputDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return plainToClass(UserOutputDto, user, { excludeExtraneousValues: true });
  }

  async register(data: UserInputDto) {
    let user = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (user)
      throw new HttpException('User already exist!', HttpStatus.BAD_REQUEST);

    user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return plainToClass(UserOutputDto, user, { excludeExtraneousValues: true });
  }

  async getAll() {
    const users = await this.userRepository.find();

    return users.map((user) =>
      plainToClass(UserOutputDto, user, { excludeExtraneousValues: true }),
    );
  }
}
