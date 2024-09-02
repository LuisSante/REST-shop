import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(4, {
    message: 'Username is too short, must be have at least 4 characters',
  })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ enum: Role, default: Role.CLIENT })
  @IsEnum(Role)
  role: Role;
}
