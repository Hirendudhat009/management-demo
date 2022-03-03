import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/auth.dto';
import { User } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @Post()
  async signup(@Body() createUserDto: createUserDto): Promise<void> {
    await this.authServices.createUser(createUserDto);
  }

  @Post('/login')
  async signIn(@Body() createUserDto: createUserDto): Promise<{}> {
    return await this.authServices.signInUser(createUserDto);
  }
}
