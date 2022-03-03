import { IsString, MaxLength, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(8)
  password: string;
}
