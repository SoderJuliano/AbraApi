import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';
import { RecoverNotificationDTO } from '../notification-controller/dtos/recover.notification.dto';
import { Logger } from 'src/utils/logger';
import { NotificationDocument } from '../schema/notification.schema';
import { NotificationRequest } from '../notification-controller/dtos/request.notification.dto';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private notificationModel: Model<NotificationDocument>) {}
    private log: Logger = new Logger();

    async createNotification(notification: NotificationDTO): Promise<NotificationDTO> {
        const newNotification = new NotificationDTO();
        newNotification.from(notification);
        const newn = new this.notificationModel(newNotification);
        await newn.save();
        return newNotification;
    }

    async getNotification(request: NotificationRequest): Promise<NotificationDTO[]> {
        this.log.print(`getNotification with url: ${request.url} and key: ${request.key}`);
         let notifications: NotificationDocument[];
        if(!request.user){
            notifications = await this.notificationModel.find({ key: request.key, appUrl: request.url }).exec();
        }else{
            notifications = await this.notificationModel.find({ key: request.key, appUrl: request.url, user: request.user }).exec();
        }

        if(notifications.length == 0){
            this.log.printError(`Could not find notifications for values ${JSON.stringify(request)}`);
            throw new NotFoundException(`Not found such notification for key: ${request.key} and appUrl: ${request.url}`);
        }

        const arrayNotifications = [];
        notifications.forEach(n => {
            const nNotification = new NotificationDTO().schemaToDto(n);
            if(nNotification.user == request.user){
                arrayNotifications.push(nNotification);
            }
        })
        return arrayNotifications;
    }
    async readNotification(id: string): Promise<NotificationDTO> {
        const dto = new NotificationDTO();
        this.log.print(`reading Notification for id: ${id}`);
        let notification = await this.notificationModel.findById(id).exec();
        if(notification == null){
            this.log.printError(`Could not find notification with id: ${id}`);
            throw new NotFoundException(`Not found such notification with id: ${id}`);
        }
        await notification.updateOne({read: true, dateUpdated: new Date(Date.now())}).exec();
        let notificationUpdated = await this.notificationModel.findById(id).exec();
        this.log.print(`Notification updated ${JSON.stringify(notificationUpdated)}`);
        return  dto.schemaToDto(notificationUpdated);
    }
}
