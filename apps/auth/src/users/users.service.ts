import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}
  private async validateCreateUser(createUserDto: CreateUserDto) {
    try {
      await this.userRepo.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUser(createUserDto);
    return this.userRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userRepo.findOne(getUserDto);
  }

  async varifyUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentails are not valid.');
    }
    return user;
  }
}
