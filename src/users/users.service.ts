import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<CreateAuthDto> {
    const user = this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
