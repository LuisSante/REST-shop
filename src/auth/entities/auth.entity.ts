import { ApiProperty } from '@nestjs/swagger';

export class AuthSignIn {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
