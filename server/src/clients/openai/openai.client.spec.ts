import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIClient } from './openai.client';

describe('OpenaiService', () => {
  let service: OpenAIClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAIClient],
    }).compile();

    service = module.get<OpenAIClient>(OpenAIClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
