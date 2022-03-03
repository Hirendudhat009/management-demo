import {
  Body,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/auth.dto';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepositery: typeof User,
    private jwtStratagy: JwtService,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hasPass = await bcrypt.hash(password, salt);

    const existUser = await this.userRepositery.findOne({
      where: { username: username },
    });

    if (existUser) {
      throw new ConflictException('User is allready exist');
    }

    const user = await this.userRepositery.create({
      username,
      password: hasPass,
    });
    await user.save();
    return user;
  }

  async signInUser(createUserDto: createUserDto): Promise<{accessToken}> {
    const { username, password } = createUserDto;

    const user = await this.userRepositery.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new ConflictException('User is not registered');
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      throw new ConflictException('Password is wrong');
    }
    const payload = { username };
    const accessToken = this.jwtStratagy.sign(payload);

    return { accessToken };
  }
}
