import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { KafkaProducer } from './kafka-producer';

@Injectable()
export class KafkaService {
  constructor(private readonly producerService: ProducerService) {}
  producer = new KafkaProducer('abra-api', '0.0.0.0:9092');

  async createKafkaMessage() {
    // Conecte-se ao Kafka antes de produzir a mensagem
    await this.producer.connect();

    try {
      await this.producer.produce('hello world');
      return 'worked';
    } catch (error) {
      // Lide com erros de produção aqui, se necessário
      console.error('Erro ao produzir mensagem Kafka:', error);
      return 'error';
    } finally {
      // Certifique-se de desconectar após o uso
      await this.producer.disconnect();
    }
    return 'worked';
  }
}