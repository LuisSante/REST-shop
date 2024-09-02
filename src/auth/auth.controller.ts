import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  checkUser(@Body() user: any) {
    return this.authService.singIn(user.username, user.password);
  }

  @Post('/signup')
  createUser(@Body() user: CreateAuthDto) {
    return this.authService.signUp(user);
  }

  @Get()
  findAll() {}
}
