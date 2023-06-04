import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notificationchema } from './notification/schema/notification.schema';
import { AdminMiddleware } from './utils/adminMidleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://soder:soder1989@164.152.37.73:27017', {
      dbName: 'notificacao',
    }),
    MongooseModule.forFeature([
      { name: 'notification', schema: Notificationchema },
    ]),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('admin');
  }
}
