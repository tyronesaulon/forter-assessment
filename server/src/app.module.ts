import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './domains/message/message.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './clients/prisma/prisma.module';
import { QuestionParserModule } from './shared/question-parser/question-parser.module';
import { AnswerBuilderModule } from './shared/answer-builder/answer-builder.module';
import { OpenAIModule } from './clients/openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MessageModule,
    PrismaModule,
    QuestionParserModule,
    AnswerBuilderModule,
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
