import { Injectable, Logger } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaClient {
  public readonly client: Kafka;
  private readonly logger = new Logger(KafkaClient.name);

  constructor(private readonly config: ConfigService) {
    this.logger.log('connecting kafka client...');
    const brokers = this.config.get('KAFKA_BROKERS').split(',');
    this.client = new Kafka({ clientId: 'forter-assessment', brokers });
    this.logger.log('kafka client connected');
  }
}
