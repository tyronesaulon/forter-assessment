import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { KafkaClient } from '../../../clients/kafka/kafka.client';
import { Producer } from 'kafkajs';
import { OnNewMessageDto } from '../dto/OnNewMessage';

@Injectable()
export class NewMessageProducer implements OnModuleInit {
  private readonly logger = new Logger(NewMessageProducer.name);
  private readonly producer: Producer;
  public static readonly topic = 'new-message.12-23-2023';

  constructor(private readonly kafka: KafkaClient) {
    this.producer = this.kafka.client.producer();
  }

  async onModuleInit() {
    try {
      this.logger.log(`connecting ${NewMessageProducer.topic} producer...`);
      await this.producer.connect();
      this.logger.log(`${NewMessageProducer.topic} producer connected`);
    } catch (e) {
      this.logger.error(`${NewMessageProducer.topic} producer error`, e);
      throw e;
    }
  }

  async publish(message: OnNewMessageDto): Promise<void> {
    await this.producer.send({
      topic: NewMessageProducer.topic,
      messages: [{ key: String(message.id), value: JSON.stringify(message) }],
    });
  }
}
