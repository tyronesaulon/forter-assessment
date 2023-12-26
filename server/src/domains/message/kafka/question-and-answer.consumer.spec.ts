import { Test, TestingModule } from '@nestjs/testing';
import { QuestionAndAnswerConsumer } from './question-and-answer.consumer';

describe('QuestionAndAnswerConsumerService', () => {
  let service: QuestionAndAnswerConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionAndAnswerConsumer],
    }).compile();

    service = module.get<QuestionAndAnswerConsumer>(QuestionAndAnswerConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
