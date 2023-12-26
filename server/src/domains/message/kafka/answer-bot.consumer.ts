import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { KafkaClient } from '../../../clients/kafka/kafka.client';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { NewMessageProducer } from './new-message.producer';
import { AnswerBuilderService } from '../../../shared/answer-builder/answer-builder.service';
import { OnNewMessageDto } from '../dto/OnNewMessage';
import { MessageRepository } from '../message.repository';
import { Author } from '@prisma/client';

@Injectable()
export class AnswerBotConsumer implements OnModuleInit {
  private readonly logger = new Logger(AnswerBotConsumer.name);
  private readonly consumer: Consumer;

  constructor(
    private readonly kafka: KafkaClient,
    private readonly answer: AnswerBuilderService,
    private readonly message: MessageRepository,
  ) {
    this.consumer = this.kafka.client.consumer({
      groupId: 'bot',
    });
  }

  async onModuleInit() {
    this.logger.log('connecting bot consumer...');
    await this.consumer.connect();
    this.logger.log('bot consumer connected');

    this.logger.log(`subscribing to ${NewMessageProducer.topic} topic...`);
    await this.consumer.subscribe({ topic: NewMessageProducer.topic });
    this.logger.log(`subscribed to ${NewMessageProducer.topic} topic...`);

    this.logger.log('running bot consumer...');
    await this.consumer.run({ eachMessage: this.handler.bind(this) });
    this.logger.log('bot consumer running...');
  }

  async handler({ message }: EachMessagePayload) {
    let question: OnNewMessageDto;
    try {
      this.logger.log('parsing message', { message });
      question = JSON.parse(String(message.value)) as OnNewMessageDto;
      this.logger.log('parsed message', { message, question });
    } catch (e) {
      this.logger.error('failed to parse message', { message, e });
    }

    if (!this.answer.isQuestion(question?.text)) {
      this.logger.log('message is not a question', { question });
      return;
    }

    this.logger.log('received question, now building answer', { question });

    let answer: string;
    try {
      this.logger.log('building answer...', { question });
      answer = await this.answer.build(question);

      this.logger.log('inserting answer...', {
        question,
        answer,
      });

      const response = await this.message.create({
        author: Author.BOT,
        text: answer,
        user_id: null,
        question_id: BigInt(question.id),
      });

      this.logger.log('inserted answer', { question, answer, response });
    } catch (e) {
      this.logger.error('failed to insert answer', { question, answer, e });
    }
  }
}
