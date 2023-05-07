import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationControllerController } from './notification-controller/notification-controller.controller';
import { NotificationService } from './services/notification.service';
import { Notificationchema } from './schema/notification.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'notification', schema: Notificationchema }]),
  ],
  controllers: [NotificationControllerController],
  providers: [NotificationService],
})
export class NotificationModule {}
