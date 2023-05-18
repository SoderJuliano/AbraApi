import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';
import { RecoverNotificationDTO } from '../notification-controller/dtos/recover.notification.dto';
import { Logger } from 'src/utils/logger';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private readonly notificationModel: Model<Notification>) {}
    private log: Logger = new Logger();

    async createNotification(notification: NotificationDTO): Promise<NotificationDTO> {
        const newNotification = new NotificationDTO();
        newNotification.from(notification);
        const newn = new this.notificationModel(newNotification);
        await newn.save();
        return newNotification;
    }

    async getNotification(recoverNotification: RecoverNotificationDTO): Promise<Notification[]> {
        this.log.print(`getNotification with url: ${recoverNotification.url} and key: ${recoverNotification.key}`);
        const notifications = await this.notificationModel.find({ key: recoverNotification.key, appUrl: recoverNotification.url }).exec();
        if(notifications.length == 0){
            this.log.printError(`Could not find notifications for values ${JSON.stringify(recoverNotification)}`);
            throw new NotFoundException(`Not found such notification for key: ${recoverNotification.getKey()} and appUrl: ${recoverNotification.getUrl()}`);
        }
        return notifications;
    }
    async readNotification(id: string): Promise<Notification> {
        this.log.print(`reading Notification for id: ${id}`);
        let notification = await this.notificationModel.findById(id).exec();
        if(notification == null){
            this.log.printError(`Could not find notification with id: ${id}`);
            throw new NotFoundException(`Not found such notification with id: ${id}`);
        }
        await notification.updateOne({read: true}).exec();
        await notification.updateOne({dateUpdated: new Date(Date.now())}).exec();
        let notificationUpdated = await this.notificationModel.findById(id).exec();
        this.log.print(`Notification updated ${JSON.stringify(notificationUpdated)}`);
        return notificationUpdated;
    }
}
