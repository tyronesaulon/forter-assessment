import { Module } from '@nestjs/common';
import { OpenAIClient } from './openai.client';
import { ElasticSearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  providers: [OpenAIClient],
  imports: [ElasticSearchModule],
  exports: [OpenAIClient],
})
export class OpenAIModule {}
