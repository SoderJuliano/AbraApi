/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { setupSwaggerDev } from './configs/swagger-dev';
import { setupSwaggerPrd } from './configs/swagger-prd';


export class HttpHandler {
    static async bootstrap() {
        dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
       
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe());
        const environment = process.env.NODE_ENV || 'development';
        if (environment === 'development') {
          setupSwaggerDev(app); // Use dev Swagger configuration
        } else {
          setupSwaggerPrd(app); // Use prd Swagger configuration
        }

        app.enableCors({
            origin: '*',
            methods: ['GET','HEAD','PATCH','POST','DELETE', 'PUT', 'OPTIONS'],
            allowedHeaders: ['access-control-allow-headers','access-control-allow-methods','access-control-allow-origin', 'X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept'],
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true
         });
        await app.listen(3001);
    }
}
