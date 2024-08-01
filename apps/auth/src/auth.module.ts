import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['apps/auth/.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        TYPE: Joi.string().required(),
        HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        APP_PORT: Joi.number().required(),
        USER_NAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configServcie: ConfigService) => ({
        secret: configServcie.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configServcie.get('JWT_EXPIRATION')}d`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
