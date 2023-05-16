import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationDTO } from './notification/notification-controller/dtos/notification.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
    getAllNotifications(): Promise<NotificationDTO[]> {
      return this.appService.getAllNotifications();
    }
}
