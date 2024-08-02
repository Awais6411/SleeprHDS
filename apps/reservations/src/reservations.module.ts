import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule, PAYMENTS_SERVICE } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationEntity } from './reservations/entities/reservation.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([ReservationEntity]),
    ConfigModule.forRoot({
      envFilePath: ['apps/reservations/.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        TYPE: Joi.string().required(),
        HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        APP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.number().required(),
        USER_NAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configServcie: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configServcie.get('AUTH_HOST'),
            port: configServcie.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configServcie: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configServcie.get('PAYMENTS_HOST'),
            port: configServcie.get('PAYMENTS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
