import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificacaoSchema } from 'src/notification/notificacao-document';
import { NotificationDocument } from 'src/notification/schema/notification.schema';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';
import { RecoverNotificationDTO } from '../notification-controller/dtos/recover.notification.dto';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private readonly notificationModel: Model<Notification>) {}

    async createNotification(notification: NotificationDTO): Promise<NotificationDTO> {
        const newNotification = new NotificationDTO();
        newNotification.from(notification);
        const newn = new this.notificationModel(newNotification);
        await newn.save();
        return newNotification;
    }

    async getNotification(recoverNotification: RecoverNotificationDTO): Promise<Notification[]> {
        console.log(`getNotification with url: ${recoverNotification.url} and key: ${recoverNotification.key}`);
        const notifications = await this.notificationModel.find({ key: recoverNotification.key, appUrl: recoverNotification.url }).exec();
        if(notifications.length == 0){
            console.log(notifications);
            throw new NotFoundException(`Not found such notification for key: ${recoverNotification.getKey()} and appUrl: ${recoverNotification.getUrl()}`);
        }
        return notifications;
    }
}
