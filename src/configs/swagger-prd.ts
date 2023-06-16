import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwaggerPrd = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Abra API')
    .setDescription('Abra API: A Notification Service for Integrating Services')
    .setVersion('1.0')
    .addTag('Notification')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Remove os endpoints de admin do document
  document.paths = Object.keys(document.paths).reduce((paths, path) => {
    if (!path.startsWith('/admin')) {
      paths[path] = document.paths[path];
    }
    return paths;
  }, {});
  SwaggerModule.setup('api', app, document);
};