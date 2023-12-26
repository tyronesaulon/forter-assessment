import { Test, TestingModule } from '@nestjs/testing';
import { ElasticSearchClient } from './elasticsearch.client';

describe('ElasticsearchService', () => {
  let service: ElasticSearchClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticSearchClient],
    }).compile();

    service = module.get<ElasticSearchClient>(ElasticSearchClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
