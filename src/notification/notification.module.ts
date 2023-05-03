import { Module } from '@nestjs/common';
import { NotificationControllerController } from './notification-controller/notification-controller.controller';

@Module({
  controllers: [NotificationControllerController]
})
export class NotificationModule {}
