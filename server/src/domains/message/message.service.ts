import { Injectable, Logger } from '@nestjs/common';
import { NewMessageProducer } from './kafka/new-message.producer';
import { OnNewMessageDto } from './dto/OnNewMessage';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);
  constructor(private readonly newMessageProducer: NewMessageProducer) {}

  async publishNewMessage(dto: OnNewMessageDto): Promise<void> {
    try {
      this.logger.log('publishing new message...', dto);
      await this.newMessageProducer.publish(dto);
      this.logger.log('published new message', dto);
    } catch (e) {
      this.logger.error('error publishing new message', { e, dto });
    }
  }
}
