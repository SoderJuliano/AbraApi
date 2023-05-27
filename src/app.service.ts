import { Injectable } from '@nestjs/common';
import { NotificationDTO } from './notification/notification-controller/dtos/notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Validator } from './utils/validator';

@Injectable()
export class AppService {
    constructor(@InjectModel('notification') private readonly notificationModel: Model<Notification>) {}
    private validator: Validator = new Validator();
    
    getHello(): string {
    return 'Hello World!';
    }

    async getAllNotifications(): Promise<NotificationDTO[]> {
    return await this.notificationModel.find();
    }

    async deleteNotification(id: string): Promise<Object> {
      this.validator.idIsValid(id);
      return await this.notificationModel.deleteOne({ _id: id });
    }
}
