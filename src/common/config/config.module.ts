import { Global, Module } from '@nestjs/common';
import { ServiceConfig } from './service.config';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import configuration from './configuratipon.register';

const providers = [ConfigService, ServiceConfig];

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
  ],
  providers,
  exports: [...providers],
})
export class ConfigModule {}
