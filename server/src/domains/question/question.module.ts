import { Module } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { ElasticSearchModule } from '../../clients/elasticsearch/elasticsearch.module';
import { OpenAIModule } from '../../clients/openai/openai.module';

@Module({
  providers: [QuestionRepository],
  imports: [ElasticSearchModule, OpenAIModule],
  exports: [QuestionRepository],
})
export class QuestionModule {}
