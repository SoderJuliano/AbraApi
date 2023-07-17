import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { NotificationDTO } from './dtos/notification.dto';
import { NotificationRequest } from './dtos/request.notification.dto';
import { NotificationRequestDTO } from './dtos/notification.request';
import { NotificationDeleteRequest } from './dtos/request.delete.notification';

@Controller('notifications')
@ApiTags('Notification')
export class NotificationControllerController {
  constructor(private readonly service: NotificationService) {}

  /**
   * 
   * @returns Returns an hello with data and time :)
   */
  @Get('/hello')
  getHello(): Promise<{ content: string }> {
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

  /**
   * Delete a single notification by id with validators
   * @param request NotificationDeleteRequest
   * @returns Json Object
   */
  @Delete('/delete')
  deleteNotification(@Body() request: NotificationDeleteRequest): Promise<Object> {
    return this.service.deleteNotification(request);
  }

  @Put("/edit")
  editNotification(@Body() notification: NotificationRequestDTO): Promise<NotificationDTO> {
    return this.service.editNotification(NotificationDTO.anyToDto(notification), notification.id);
  }

}
