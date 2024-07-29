import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './common/config/config.module';
import { ServiceConfig } from './common/config';
import * as path from 'node:path';
import { LinkModule } from './links/link.module';

@Module({
  imports: [
    ConfigModule,
    LinkModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ServiceConfig],
      useFactory: (config: ServiceConfig) => ({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        database: config.database,
        username: config.username,
        password: config.password,
        entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
