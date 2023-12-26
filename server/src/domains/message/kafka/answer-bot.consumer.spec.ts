import { Test, TestingModule } from '@nestjs/testing';
import { AnswerBotConsumer } from './answer-bot.consumer';

describe('BotConsumerService', () => {
  let service: AnswerBotConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerBotConsumer],
    }).compile();

    service = module.get<AnswerBotConsumer>(AnswerBotConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
