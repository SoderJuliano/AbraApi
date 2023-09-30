import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaController } from './kafka.controller';
import { ProducerService } from './producer.service';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [KafkaController],
  providers: [KafkaService, ProducerService],
})
export class KafkaModule {}
