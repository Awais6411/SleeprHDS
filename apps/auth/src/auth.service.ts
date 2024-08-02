import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UserEntity } from './users/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configSevcie: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: UserEntity, response: Response) {
    try {
      const tokenPayload: TokenPayload = {
        userId: user.id,
      };

      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + this.configSevcie.get('JWT_EXPIRATION'),
      );

      const token = this.jwtService.sign(tokenPayload);

      response.cookie('Authentication', token, {
        httpOnly: true,
        expires: expires,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
