import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule } from '@app/common';
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
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}