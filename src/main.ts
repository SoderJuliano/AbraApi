import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs-extra';
import * as path from 'path';

async function bootstrap() {
  const appDirectory = process.cwd();
	const httpsOptions = {
		key: fs.readFileSync(path.join(appDirectory, './src/private.key')),
		cert: fs.readFileSync(path.join(appDirectory, './src/certificate.crt')),
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
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
