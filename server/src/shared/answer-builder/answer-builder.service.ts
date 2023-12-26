import { Injectable, Logger } from '@nestjs/common';
import { OnNewMessageDto } from '../../domains/message/dto/OnNewMessage';
import { QuestionRepository } from '../../domains/question/question.repository';
import { PersonalityService } from './personality.service';

@Injectable()
export class AnswerBuilderService {
  private readonly logger = new Logger(AnswerBuilderService.name);
  constructor(
    private readonly question: QuestionRepository,
    private readonly personality: PersonalityService,
  ) {}
  async build(dto: OnNewMessageDto) {
    const { text } = dto;
    if (!this.isQuestion(text)) {
      const error = new Error('message is not a question');
      this.logger.error(error.message, { dto });
      throw error;
    }

    this.logger.log('received question', { dto });

    const question = await this.question.search(text);
    if (!question) {
      const error = new Error('question not found');
      this.logger.error(error.message, { dto });
      throw error;
    }

    this.logger.log('found similar previously answered question', {
      dto,
      question,
    });

    let answer = question.answers?.[0]?.text;
    if (!answer.length) {
      const error = new Error('question has no answer');
      this.logger.error(error.message, { dto, question });
      throw error;
    }

    this.logger.log('found answer', { dto, question, answer });

    try {
      this.logger.log('attempting to personalize answer', {
        dto,
        question,
        answer,
      });
      answer = await this.personality.personalize(text, answer);
      this.logger.log('personalized answer', { dto, question, answer });
    } catch (e) {
      this.logger.error('failed to personalize answer', {
        dto,
        question,
        answer,
        e,
      });
    }

    return answer;
  }

  isQuestion(text?: string) {
    return text?.includes('?');
  }
}
