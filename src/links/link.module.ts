import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LINKS_SERVICE } from './di.constant';
import { ConfigModule } from '../common/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './link.entity';

const providers = [{ provide: LINKS_SERVICE, useClass: LinkService }];

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Links])],
  providers,
  exports: [...providers],
})
export class LinkModule {}
