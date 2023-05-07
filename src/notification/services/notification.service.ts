import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificacaoSchema } from 'src/notification/notificacao-document';
import { NotificationDocument } from 'src/notification/schema/notification.schema';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private readonly notificationModel: Model<Notification>) {}

    async getAllNotifications(): Promise<Notification[]> {
        return await this.notificationModel.find();
    }
}
