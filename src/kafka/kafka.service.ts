import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { KafkaHandler } from './kafka-handler';
import { NotificationDTO } from 'src/notification/notification-controller/dtos/notification.dto';

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}

  async createKafkaMessage(notification: NotificationDTO) {
    // Conecte-se ao Kafka antes de produzir a mensagem
    const kafka = new KafkaHandler(notification.key, '0.0.0.0:9092');
    await kafka.connect();

    try {
      await kafka.produce(notification.toString());
      return 'worked';
    } catch (error) {
      // Lide com erros de produção aqui, se necessário
      console.error('Erro ao produzir mensagem Kafka:', error);
      return 'error';
    } finally {
      // Certifique-se de desconectar após o uso
      await kafka.disconnect();
    }
    return 'worked';
  }

  /* async consumeKafkaTopic(topic: string): Promise<any> {
    return await this.kafka.consumeTopic(topic);
  } */
}
