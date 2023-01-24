import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version } from '../package.json';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const globalPrefix = process.env.GLOBAL_PREFIX || 'v1';

  if ((process.env.ENV || 'PROD') == 'DEV')
    logger.debug(`enviroment vars: ${JSON.stringify(process.env)}`);


  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: '*',
    },
  });
  app.setGlobalPrefix(globalPrefix);


  const config = new DocumentBuilder()
    .setTitle('PH API')
    .setDescription('The PH API description')
    .setVersion(version)
    .setBasePath(globalPrefix)
    .addTag('PH')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Version: ${version}`);
  logger.log(`API Server listening on PORT: ${port}`);
}
bootstrap();
