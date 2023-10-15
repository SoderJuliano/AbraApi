import { Logger } from '@nestjs/common';
import { EachMessagePayload, Kafka, Producer } from 'kafkajs';
import { IProducer } from './kafka.interface';

export class KafkaHandler implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string, broker: string) {
    this.kafka = new Kafka({
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  async produce(message: string) {
    const mensagem = {
      value: message,
    };
    await this.producer.send({ topic: this.topic, messages: [mensagem] });
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      // Adicione um atraso antes de tentar reconectar para evitar loops de reconexão rápidos.
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos antes de tentar novamente.
      await this.connect(); // Tenta reconectar após um atraso.
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  //CONSUMMER KAFKA

  /*  async consume(topic: string) {
    const consumer = this.kafka.consumer({ groupId: 'abra-app' });

    await consumer.connect();
    await consumer.subscribe({ topic: topic });

    await consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        // Esta função será chamada para cada mensagem recebida do Kafka
        // Aqui você pode processar a mensagem como desejar
        console.log({
          topic: topic,
          partition: partition,
          value: message.value.toString(),
          headers: message.headers,
        });
      },
    });
  }

  async consumeTopic(topic: string) {
    const consumer = this.kafka.consumer({ groupId: 'abra-app' });
    const messages = [];
    await consumer.connect();
    await consumer.subscribe({ topic: topic });

    await consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        messages.push(message);
      },
    });
    return messages;
  } */
}
