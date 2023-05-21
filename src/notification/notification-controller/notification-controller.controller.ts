import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { NotificationDTO } from './dtos/notification.dto';
import { RecoverNotificationDTO } from './dtos/recover.notification.dto';
import { NotificationRequest } from './dtos/request.notification.dto';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationControllerController {
    constructor(private readonly service: NotificationService) {}

    /**
     * A notification
     */
    @Get()
    getNotification(@Body() request: NotificationRequest): Promise<NotificationDTO[]> {
        //const recoverNotification = new RecoverNotificationDTO(request.url, request.key);
        return this.service.getNotification(request);
    }

    /**
     * Set a notification as read
     */
    @Patch(':id')
    readNotification(@Param('id') id: string): Promise<NotificationDTO> {
        return this.service.readNotification(id);
    }

    /**
     * Create a notification
     */
    @Post()
    createNotification(@Body() notification: NotificationDTO): Promise<NotificationDTO> {
        return this.service.createNotification(notification);
    }
}
