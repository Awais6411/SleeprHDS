import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const options: TypeOrmModuleOptions = {
          type: configService.get<any>('TYPE'),
          host: configService.get<string>('HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('USER_NAME'),
          password: configService.get<string>('PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
        return options;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities?: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
