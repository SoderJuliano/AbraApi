import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpHandler } from './httpHandler';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
  const appDirectory = process.cwd();
  const httpsOptions = {
    key: fs.readFileSync(path.join(appDirectory, process.env.PRIVATE_KEY)),
    cert: fs.readFileSync(path.join(appDirectory, process.env.CERTIFICATE)),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Abra API')
    .setDescription(
      'The Abra API it`s a notification service that provides notification for any other services',
    )
    .setVersion('1.0')
    .addTag('Notification')
    .addTag('Admin')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    methods: ['GET','HEAD','PATCH','POST','DELETE'],
    allowedHeaders: ['access-control-allow-headers','access-control-allow-methods','access-control-allow-origin', 'X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true 
 });
  await app.listen(3000);
}
bootstrap();
HttpHandler.bootstrap();
