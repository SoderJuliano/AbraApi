import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationControllerController } from './notification-controller/notification-controller.controller';
import { NotificationService } from './services/notification.service';
import { Notificationchema } from './schema/notification.schema'
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'notification', schema: Notificationchema }]),
    forwardRef(() => AppModule),
  ],
  controllers: [NotificationControllerController],
  providers: [NotificationService],
})
export class NotificationModule {}
