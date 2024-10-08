import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSignIn } from './entities/auth.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('/auth')
@ApiTags('Auth')
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  @ApiOperation({ summary: 'User registration' })
  signUp(@Body() user: CreateAuthDto) {
    return this.authService.signUp(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
  })
  @ApiBody({
    description: 'Login credentials',
    type: AuthSignIn,
  })
  signIn(@Body() user: Record<string, any>) {
    return this.authService.singIn(user.email, user.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete('/singout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Successfully signed out' })
  @ApiBearerAuth()
  signOut(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    this.authService.signOut(token);

    return {};
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
