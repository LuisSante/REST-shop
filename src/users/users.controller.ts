import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/search/:email')
  @HttpCode(HttpStatus.OK)
  @HttpCode(404)
  getUser(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
}
