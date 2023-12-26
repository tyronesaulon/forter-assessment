import { Test, TestingModule } from '@nestjs/testing';
import { NewMessageProducer } from './new-message.producer';

describe('NewMessageService', () => {
  let service: NewMessageProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewMessageProducer],
    }).compile();

    service = module.get<NewMessageProducer>(NewMessageProducer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
