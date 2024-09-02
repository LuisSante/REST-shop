import { Controller, Get, Param, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/search/:username')
  @HttpCode(404)
  getUser(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}
