import { Module } from '@nestjs/common';
import { QuestionParserService } from './question-parser.service';
import { QuestionModule } from '../../domains/question/question.module';

@Module({
  providers: [QuestionParserService],
  exports: [QuestionParserService],
  imports: [QuestionModule],
})
export class QuestionParserModule {}
