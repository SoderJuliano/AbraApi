import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwaggerDev = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Abra API (Dev)')
    .setDescription('Abra API: A Notification Service for Integrating Services')
    .setVersion('1.0')
    .addTag('Notification')
    .addTag('Admin')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};