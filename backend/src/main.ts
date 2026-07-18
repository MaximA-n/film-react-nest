import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import 'dotenv/config';

function getLogger() {
  const loggerType = process.env.LOGGER ?? 'dev';

  switch (loggerType) {
    case 'json': return new JsonLogger();
    case 'tskv': return new TskvLogger();
    default: return new DevLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // копит логи до подключения логгера
  });

  app.useLogger(getLogger());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
