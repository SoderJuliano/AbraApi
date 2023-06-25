import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotificationModule } from './notification/notification.module';
import { HttpHandler } from './httpHandler';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { setupSwaggerDev } from './configs/swagger-dev';
import { setupSwaggerPrd } from './configs/swagger-prd';
import { Logger } from './utils/logger';

async function bootstrap() {
  dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
  const appDirectory = process.cwd();
  const httpsOptions = {
    key: fs.readFileSync(path.join(appDirectory, process.env.PRIVATE_KEY)),
    cert: fs.readFileSync(path.join(appDirectory, process.env.CERTIFICATE)),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  const app2 = await NestFactory.create(NotificationModule, { httpsOptions })
  app.useGlobalPipes(new ValidationPipe());

  const environment = process.env.NODE_ENV || 'development';
  Logger.print(`Starting application as ${environment} mode!`);
  if (environment === 'development') {
    setupSwaggerDev(app); // Use dev Swagger configuration
    setupSwaggerDev(app2);
  } else {
    setupSwaggerPrd(app); // Use prd Swagger configuration
    setupSwaggerPrd(app2);
  }

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
