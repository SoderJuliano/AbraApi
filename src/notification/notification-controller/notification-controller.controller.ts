import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Notificacao } from '../notificacao-document';
import { NotificationService } from '../services/notification.service';
import { NotificationDTO } from './dtos/notification.dto';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationControllerController {
    constructor(private readonly service: NotificationService) {}

    /**
     * 
     * All notifications
     */
    @Get()
    getNotifications(): Promise<NotificationDTO[]> {
        return this.service.getAllNotifications();
    }

    /**
     * A notification
     */
    @Get(':id')
    getNotification(@Param() id: string) {
        return `Notification with id ${id}`;
    }

    /**
     * Set a notification as read
     */
    @Patch(':id')
    readNotification(@Param() id: string) {
        return `Notification with id ${id} has been read`;
    }
    
    /**
     * Create a notification
     */
    @Post()
    createNotification(@Body() notification: NotificationDTO): Promise<NotificationDTO> {
        return this.service.createNotification(notification);
    }
}
