import { Test, TestingModule } from '@nestjs/testing';
import { AnswerBuilderService } from './answer-builder.service';

describe('AnswerService', () => {
  let service: AnswerBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerBuilderService],
    }).compile();

    service = module.get<AnswerBuilderService>(AnswerBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
