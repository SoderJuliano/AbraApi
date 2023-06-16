import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
   * 
   * @returns Returns an hello with data and time :)
   */
  @Get('/hello')
  getHello(): Promise<{ message: string }> {
    return this.service.getHello();
  }

  /**
   * Retrive one or many notifications with a given body, may not work in swagger
   * but you may call by Postman or bash with the curl command
   */
  @Get()
  getNotification(
    @Body() request: NotificationRequest,
  ): Promise<NotificationDTO[]> {
    //const recoverNotification = new RecoverNotificationDTO(request.url, request.key);
    return this.service.getNotification(request);
  }

  /**
   * Retrive one or many notifications with optional parameters
   * 
   */
  @Get('/retrieve')
  @ApiQuery({
    name: 'user',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'url',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'key',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Success' })
  retrieveNotification(@Query() request: NotificationRequest): Promise<NotificationDTO[]> {
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
  createNotification(
    @Body() notification: NotificationDTO,
  ): Promise<NotificationDTO> {
    return this.service.createNotification(notification);
  }

}
