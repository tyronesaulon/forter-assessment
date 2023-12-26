import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { KafkaModule } from '../../clients/kafka/kafka.module';
import { NewMessageProducer } from './kafka/new-message.producer';
import { MessageService } from './message.service';
import { PrismaModule } from '../../clients/prisma/prisma.module';
import { MessageRepository } from './message.repository';
import { QuestionParserModule } from '../../shared/question-parser/question-parser.module';
import { QuestionAndAnswerConsumer } from './kafka/question-and-answer.consumer';
import { AnswerBotConsumer } from './kafka/answer-bot.consumer';
import { AnswerBuilderModule } from '../../shared/answer-builder/answer-builder.module';

@Module({
  controllers: [MessageController],
  imports: [
    KafkaModule,
    PrismaModule,
    QuestionParserModule,
    AnswerBuilderModule,
  ],
  providers: [
    NewMessageProducer,
    QuestionAndAnswerConsumer,
    AnswerBotConsumer,
    MessageService,
    MessageRepository,
  ],
})
export class MessageModule {}
