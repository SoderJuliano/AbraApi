import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificacaoSchema } from 'src/notification/notificacao-document';
import { NotificationDocument } from 'src/notification/schema/notification.schema';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private readonly notificationModel: Model<Notification>) {}

    async getAllNotifications(): Promise<NotificationDTO[]> {
        return await this.notificationModel.find();
    }

    async createNotification(notification: NotificationDTO): Promise<NotificationDTO> {
        notification.setDataCriacao();
        const newNotification = new this.notificationModel(notification);
        await newNotification.save();
        return notification;
    }
}
