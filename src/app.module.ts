import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notificationchema } from './notification/schema/notification.schema';
import { AdminMiddleware } from './utils/adminMidleware';

//mongodb://soder:soder1989@172.18.0.3:27017
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/27017', {
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
