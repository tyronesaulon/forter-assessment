import { Module } from '@nestjs/common';
import { ElasticSearchClient } from './elasticsearch.client';

@Module({
  providers: [ElasticSearchClient],
  exports: [ElasticSearchClient],
})
export class ElasticSearchModule {}
