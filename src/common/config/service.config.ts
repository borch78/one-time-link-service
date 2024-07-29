import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';

@Injectable()
export class ServiceConfig {
  constructor(private readonly config: Config) {}

  public get serverHost(): string {
    return this.config.get('config.server.host') ?? '';
  }
  public get serverPort(): number {
    return this.config.get('config.server.port') ?? 3000;
  }

  public get dbHost(): string {
    return this.config.get('config.database.host') ?? '';
  }

  public get dbPort(): number {
    return this.config.get('config.database.port') ?? 5432;
  }

  public get database(): string {
    return this.config.get('config.database.database') ?? '';
  }

  public get username(): string {
    return this.config.get('config.database.username') ?? '';
  }

  public get password(): string {
    return this.config.get('config.database.password') ?? '';
  }
}
