import { Injectable } from '@nestjs/common';
import { OnNewMessageDto } from '../../domains/message/dto/OnNewMessage';
import { QuestionRepository } from '../../domains/question/question.repository';
import { QuestionDoc } from '../../domains/question/models/question.interface';
import { Message } from '@prisma/client';

@Injectable()
export class QuestionParserService {
  constructor(private readonly question: QuestionRepository) {}

  isQuestionSaved(id: number) {
    return this.question.exists(id);
  }

  async saveQuestion(answer: OnNewMessageDto, question: Message) {
    const vector_data = []; // TODO: add number[] vector data

    const doc: QuestionDoc = {
      question_id: String(answer.question_id),
      text: question.text,
      vector_data,
      answers: [
        {
          answer_id: answer.id,
          text: answer.text,
        },
      ],
    };

    await this.question.createQuestionVector(doc);
  }

  async saveAnswerToQuestion(answer: OnNewMessageDto) {
    const result = await this.question.get(answer.question_id);
    const question: QuestionDoc = {
      ...result._source,
      answers: [
        ...result._source.answers,
        {
          answer_id: answer.id,
          text: answer.text,
        },
      ],
    };

    await this.question.update(answer.question_id, question);
  }
}
