import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificacaoSchema } from 'src/notification/notificacao-document';
import { NotificationDocument } from 'src/notification/schema/notification.schema';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private readonly notificationModel: Model<Notification>) {}

    async createNotification(notification: NotificationDTO): Promise<NotificationDTO> {
        const newNotification = new NotificationDTO();
        newNotification.from(notification);
        newNotification.setDataCriacao();
        const newn = new this.notificationModel(newNotification);
        await newn.save();
        return newNotification;
    }
}
