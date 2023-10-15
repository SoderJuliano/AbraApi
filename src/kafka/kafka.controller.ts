import { Body, Controller, Param, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDTO } from '../notification/notification-controller/dtos/notification.dto';

@ApiTags('Kafka')
@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('/create')
  createMessage(
    @Param('topic') topic: string,
    @Body() notification: NotificationDTO,
  ): Promise<string> {
    return this.kafkaService.createKafkaMessage(notification);
  }

  /*  @Get('/consume/topic/:topic')
  consumeTopic(@Param('topic') topic: string): Promise<any> {
    return this.kafkaService.consumeKafkaTopic(topic);
  } */
}
