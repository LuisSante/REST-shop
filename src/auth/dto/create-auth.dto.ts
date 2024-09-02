import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(4, {
    message: 'Username is too short, must be have at least 4 characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @Min(0)
  age: number;
}
