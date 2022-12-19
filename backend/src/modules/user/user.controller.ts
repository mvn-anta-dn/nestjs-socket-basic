import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInputDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  login(@Body() data: UserInputDto) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserInputDto) {
    return this.userService.register(data);
  }

  @Get('users')
  getAll() {
    return this.userService.getAll();
  }
}
