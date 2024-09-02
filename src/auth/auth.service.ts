import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(user: CreateAuthDto) {
    const hashPass = await bcrypt.hash(user.password, this.saltOrRounds);
    const newData = {
      ...user,
      password: hashPass,
    };
    return this.prisma.user.create({ data: newData });
  }

  async singIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
