import { Module } from '@nestjs/common';
import { AnswerBuilderService } from './answer-builder.service';
import { OpenAIModule } from '../../clients/openai/openai.module';
import { QuestionModule } from '../../domains/question/question.module';
import { PersonalityService } from './personality.service';

@Module({
  providers: [AnswerBuilderService, PersonalityService],
  imports: [OpenAIModule, QuestionModule],
  exports: [AnswerBuilderService],
})
export class AnswerBuilderModule {}
