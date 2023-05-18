import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { NotificationDTO } from './dtos/notification.dto';
import { RecoverNotificationDTO } from './dtos/recover.notification.dto';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationControllerController {
    constructor(private readonly service: NotificationService) {}

    /**
     * A notification
     */
    @Get(':url/:key')
    getNotification(@Param('url') url: string, @Param('key') key: string): Promise<Notification[]> {
        const recoverNotification = new RecoverNotificationDTO(url, key);
        return this.service.getNotification(recoverNotification);
    }

    /**
     * Set a notification as read
     */
    @Patch(':id')
    readNotification(@Param('id') id: string): Promise<Notification> {
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
