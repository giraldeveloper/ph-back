import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version } from '../package.json';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: '*',
    },
  });
  const globalPrefix = process.env.GLOBAL_PREFIX || 'v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Version: ${version}`);
  logger.log(`API Server listening on PORT: ${port}`);

  if ((process.env.ENV || 'PROD') == 'DEV')
    logger.debug(`enviroment vars: ${JSON.stringify(process.env)}`);
}
bootstrap();
