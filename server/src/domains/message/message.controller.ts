import { Body, Controller, Post } from '@nestjs/common';
import { OnNewMessageDto } from './dto/OnNewMessage';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('webhook')
  async onNewMessage(@Body() body: OnNewMessageDto) {
    await this.messageService.publishNewMessage(body);
  }
}
