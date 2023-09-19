import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notificationchema } from './notification/schema/notification.schema';
import { AdminMiddleware } from './utils/adminMidleware';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaConsumerService } from './kafka.consumer/kafka.consumer.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([
      { name: 'notification', schema: Notificationchema },
    ]),
    NotificationModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, KafkaConsumerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('admin');
  }
}
