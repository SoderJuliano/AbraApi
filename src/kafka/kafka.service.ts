import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { KafkaHandler } from './kafka-handler';

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}
  kafka = new KafkaHandler('abra-api', '0.0.0.0:9092');

  async createKafkaMessage() {
    // Conecte-se ao Kafka antes de produzir a mensagem
    await this.kafka.connect();

    try {
      await this.kafka.produce('hello world');
      return 'worked';
    } catch (error) {
      // Lide com erros de produção aqui, se necessário
      console.error('Erro ao produzir mensagem Kafka:', error);
      return 'error';
    } finally {
      // Certifique-se de desconectar após o uso
      await this.kafka.disconnect();
    }
    return 'worked';
  }

  async consumeKafkaTopic(topic: string): Promise<any> {
    return await this.kafka.consumeTopic(topic);
  }
}
