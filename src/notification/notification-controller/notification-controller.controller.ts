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
    @Patch()
    getNotification(@Body() recoverNotification: RecoverNotificationDTO): Promise<Notification[]> {
        return this.service.getNotification(recoverNotification);
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
