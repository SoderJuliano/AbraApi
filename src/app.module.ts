import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationControllerController } from './notification/notification-controller/notification-controller.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://soder:soder1989@172.18.0.3:27017', {
      dbName: 'notificacao',
    }), 
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
