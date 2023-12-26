import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { KafkaClient } from '../../../clients/kafka/kafka.client';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { NewMessageProducer } from './new-message.producer';
import { OnNewMessageDto } from '../dto/OnNewMessage';
import { QuestionParserService } from '../../../shared/question-parser/question-parser.service';
import { MessageRepository } from '../message.repository';

@Injectable()
export class QuestionAndAnswerConsumer implements OnModuleInit {
  private readonly logger = new Logger(QuestionAndAnswerConsumer.name);
  private readonly consumer: Consumer;

  constructor(
    private readonly kafka: KafkaClient,
    private readonly message: MessageRepository,
    private readonly parser: QuestionParserService,
  ) {
    this.consumer = this.kafka.client.consumer({
      groupId: 'question-and-answer',
    });
  }

  async onModuleInit() {
    this.logger.log('connecting question-and-answer consumer...');
    await this.consumer.connect();
    this.logger.log('question-and-answer consumer connected');

    this.logger.log(`subscribing to ${NewMessageProducer.topic} topic...`);
    await this.consumer.subscribe({ topic: NewMessageProducer.topic });
    this.logger.log(`subscribed to ${NewMessageProducer.topic} topic...`);

    this.logger.log('running question-and-answer consumer...');
    await this.consumer.run({ eachMessage: this.handler.bind(this) });
    this.logger.log('question-and-answer consumer running...');
  }

  async handler({ message }: EachMessagePayload) {
    const answer = JSON.parse(String(message.value)) as OnNewMessageDto;
    this.logger.log(`received message`, answer);
    if (!answer.question_id) {
      this.logger.log(`message is not an answer`, answer);
      return; // skip
    }

    const exists = await this.parser.isQuestionSaved(answer.question_id);
    if (exists) {
      try {
        this.logger.log('add answer to question', {
          answer,
          exists,
        });

        await this.parser.saveAnswerToQuestion(answer);

        this.logger.log('add answer to question done', {
          answer,
          exists,
        });
      } catch (e) {
        this.logger.error('add answer to question error', e);
      }
    } else {
      try {
        this.logger.log('save question', {
          answer,
          exists,
        });

        const question = await this.message.get(answer.question_id);
        await this.parser.saveQuestion(answer, question);

        this.logger.log('save question done', {
          answer,
          exists,
        });
      } catch (e) {
        this.logger.error('save question error', e);
      }
    }
  }
}
