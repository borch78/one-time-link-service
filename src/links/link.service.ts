import { customAlphabet } from 'nanoid';

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ServiceConfig } from '../common/config';
import { Links } from './link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkIsNotActiveError } from './errors';

@Injectable()
export class LinkService {
  public readonly nanoid;

  constructor(
    @InjectRepository(Links)
    private readonly linksRepository: Repository<Links>,
    private readonly config: ServiceConfig,
  ) {
    this.nanoid = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
      10,
    );
  }

  async getLongLink(shortLink: string): Promise<string | null> {
    try {
      const linkData = await this.linksRepository.findOne({
        where: {
          short: shortLink,
        },
      });
      if (!linkData) {
        return null;
      }
      if (!linkData.isActive) {
        throw new LinkIsNotActiveError();
      }

      await this.linksRepository.update(
        { short: shortLink },
        { isActive: false },
      );
      return linkData.long;
    } catch (err) {
      throw err;
    }
  }

  async createShortLink(incomeUrl: string): Promise<string> {
    try {
      const short = this.nanoid();
      await this.linksRepository.save({
        long: incomeUrl,
        short,
        isActive: true,
      });
      return `${this.config.serverHost}/${short}`;
    } catch (err) {
      throw err;
    }
  }
}
