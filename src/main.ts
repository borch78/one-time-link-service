import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ServiceConfig } from './common/config';
import { EXCEPTION_FILTERS } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ServiceConfig);

  app.useGlobalFilters(...EXCEPTION_FILTERS);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('disposable link service')
    .setDescription('test task disposable link service')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.serverPort);
}
bootstrap();
