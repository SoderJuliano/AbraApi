import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationControllerController {
    constructor(private readonly service: NotificationService) {}

    /**
     * 
     * @returns All notifications
     */
    @Get()
    getNotifications() {
        return this.service.getAllNotifications();
    }

    /**
     * @returns A notification
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
    
}
