/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDTO } from '../notification-controller/dtos/notification.dto';
import { Logger } from '../../utils/logger';
import { NotificationDocument } from '../schema/notification.schema';
import { NotificationRequest } from '../notification-controller/dtos/request.notification.dto';
import { Validator } from '../../utils/validator';
import { NotificationDeleteRequest } from '../notification-controller/dtos/request.delete.notification';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('notification') private notificationModel: Model<NotificationDocument>) { }
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

        if (!request.user) {
            notifications = await this.notificationModel.find({ key: request.key, appUrl: request.url }).exec();
        } else if (!request.url) {
            notifications = await this.notificationModel.find({ key: request.key, user: request.user }).exec();
        } else {
            notifications = await this.notificationModel.find({ key: request.key, appUrl: request.url, user: request.user }).exec();
        }

        if (notifications.length == 0) {
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
            if (nNotification.user == request.user) {
                arrayNotifications.push(nNotification);
            }
        })
        return arrayNotifications;
    }

    async readNotification(id: string): Promise<NotificationDTO> {
        this.validator.idIsValid(id);
        Logger.print(`Reading Notification for id: ${id}`);
        const notification = await this.notificationModel.findById(id).exec();
        if (notification == null) {
            Logger.printError(`Could not find notification with id: ${id}`);
            throw new NotFoundException(`Not found such notification with id: ${id}`);
        }
        await notification.updateOne({ read: true, dateUpdated: new Date(Date.now()) }).exec();
        const notificationUpdated = await this.notificationModel.findById(id).exec();
        Logger.print(`Notification updated ${JSON.stringify(notificationUpdated)}`);
        return NotificationDTO.anyToDto(notificationUpdated);
    }

    async getHello(): Promise<{ content: string }> {
        const greeting = 'Hello! Welcome to Abra API.';
        const currentTime = new Date().toLocaleTimeString();

        const response = {
            content: `${greeting} The current time is ${currentTime}, time zone: Etc/UTC (UTC, +0000).`,
        };

        return response;
    }

    async deleteNotification(request: NotificationDeleteRequest): Promise<Object> {
        this.validator.idIsValid(request.id);
        Logger.print(`Deleting Notification for id: ${request.id}`);
        const document = await this.notificationModel.findById(request.id).exec();
        
        if(!document){this.throwBadRequest(`Not found Notification for id: ${request.id}`)}

        const dto: NotificationDTO = NotificationDTO.anyToDto((document).toObject());
        
        if(!this.shouldDelete(dto, request)){
            this.throwBadRequest('Tried to delete Notification with invalid informations');
        }
        
        return this.deleteById(request.id)
    }

    async editNotification(request: NotificationDTO, id:string): Promise<NotificationDTO> {
        
        this.validator.idIsValid(request.id);

        let notification: NotificationDTO = await this.findModel(request);
        
        notification.setApp(request.app);
        notification.setAppUrl(request.appUrl);
        notification.setLanguage(request.language);
        notification.setUser(request.user);
        notification.setContent(request.content);
        notification.setTitle(request.title)
        notification.setDataAtualizacao(); 

        try{
            await this.notificationModel.findByIdAndUpdate(notification.id, notification);
            Logger.print(`Notification ${notification.id} updated succesfully.`)
        }catch(error){
            Logger.printError(`An error ocurred when trying update an object with the id ${notification.id}. [Error]: ${error}`);
        }

        return notification;
    }

    private shouldDelete(dto: NotificationDTO, request: NotificationDeleteRequest): boolean {
        if (request.id !== dto.id || request.key !== dto.key) {
            return false;
        }

        if (dto.user && request.user !== dto.user) {
            return false;
        }

        if (dto.appUrl && request.appUrl !== dto.appUrl) {
            return false;
        }

        return true;
    }

    private async deleteById(id: string): Promise<Object> {
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

    private throwBadRequest(message: string){
        Logger.printError(message);
        throw new BadRequestException(message);
    }

    private async findModel(request: NotificationDTO): Promise<NotificationDTO> {
        try{
            const model = await this.notificationModel.findById(request.id);
            const dto: NotificationDTO = NotificationDTO.anyToDto((model).toObject());
            if (request.key !== dto.key) {
                this.throwBadRequest(`Key do not match: ${request.key}`);
            }
            return dto;
        }catch(error){
            this.throwBadRequest("No notification found!")
            Logger.printError(error);
        }
    }
}
