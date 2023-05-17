import { BadRequestException, Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationDTO } from './notification/notification-controller/dtos/notification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Logger } from './utils/logger';

@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private log: Logger = new Logger();

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/all')
    getAllNotifications(): Promise<NotificationDTO[]> {
      return this.appService.getAllNotifications();
    }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string): Promise<Object> {
    try{
      this.log.print(`Deleting notification ${id}`);
      return await this.appService.deleteNotification(id);
    }catch(err){
      this.log.printError(err.message);
      throw new BadRequestException(err.message);
    }
    
  }

}
