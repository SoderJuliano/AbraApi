import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Kafka')
@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('/create')
  createMessage(): Promise<string> {
    return this.kafkaService.createKafkaMessage();
  }
}
