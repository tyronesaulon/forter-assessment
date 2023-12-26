import { Test, TestingModule } from '@nestjs/testing';
import { QuestionParserService } from './question-parser.service';

describe('QuestionParserService', () => {
  let service: QuestionParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionParserService],
    }).compile();

    service = module.get<QuestionParserService>(QuestionParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
