import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';
import { Logger } from 'src/utils/logger';
import { NotificationDocument } from '../schema/notification.schema';
import { NotificationRequest } from '../notification-controller/dtos/request.notification.dto';
import { Validator } from 'src/utils/validator';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private notificationModel: Model<NotificationDocument>) {}
    private validator: Validator = new Validator();

    async createNotification(notification: NotificationDTO): Promise<NotificationDTO> {
        const newNotification = new NotificationDTO();
        newNotification.dtoToDto(notification);
        const newn = new this.notificationModel(newNotification);
        await newn.save();
        return newNotification;
    }

    async getNotification(request: NotificationRequest): Promise<NotificationDTO[]> {
        
        Logger.print(`getNotification with url: ${request.url} and key: ${request.key}`);
        let notifications: NotificationDocument[];
        
        if(!request.user){
            notifications = await this.notificationModel.find({ key: request.key, appUrl: request.url }).exec();
        }else if(!request.url){
            notifications = await this.notificationModel.find({ key: request.key, user: request.user }).exec();
        }else{
            notifications = await this.notificationModel.find({ key: request.key, appUrl: request.url, user: request.user }).exec();
        }

        if(notifications.length == 0){
            Logger.printError(`Could not find notifications for values ${JSON.stringify(request)}`);
            throw new NotFoundException(
              `Could not find notifications for values ${JSON.stringify(
                request,
              )}`,
            );
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
        this.validator.idIsValid(id);
        const dto = new NotificationDTO();
        Logger.print(`Reading Notification for id: ${id}`);
        let notification = await this.notificationModel.findById(id).exec();
        if(notification == null){
            Logger.printError(`Could not find notification with id: ${id}`);
            throw new NotFoundException(`Not found such notification with id: ${id}`);
        }
        await notification.updateOne({read: true, dateUpdated: new Date(Date.now())}).exec();
        let notificationUpdated = await this.notificationModel.findById(id).exec();
        Logger.print(`Notification updated ${JSON.stringify(notificationUpdated)}`);
        return  dto.schemaToDto(notificationUpdated);
    }

    async getHello(): Promise<{ content: string }> {
        const greeting = 'Hello! Welcome to Abra API.';
        const currentTime = new Date().toLocaleTimeString();

        const response = {
            content: `${greeting} The current time is ${currentTime}, time zone: Etc/UTC (UTC, +0000).`,
        };

        return response;
    }

    async deleteNotification(id: string): Promise<Object> {
        this.validator.idIsValid(id);
        Logger.print(`Deleting Notification for id: ${id}`);
        try {
            const deletedObject = await this.notificationModel.findByIdAndDelete(id).exec();
            if (deletedObject) {
              return { content: `Notification ${id} deleted successfully.` };
            } else {
                throw new NotFoundException(`Notification ${id} not found.`)
            }
        } catch (error) {
        Logger.printError(`Error when tryed delete notification with id: ${id}`);
        if (error instanceof NotFoundException) {
            throw error; // Re-throw the NotFoundException
        } else {
            throw new InternalServerErrorException(`Error when trying to delete notification with id: ${id}`);
        }
          }
    }
}
