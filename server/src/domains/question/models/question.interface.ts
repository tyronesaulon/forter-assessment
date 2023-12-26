export interface AnswerDoc {
  answer_id: number;
  text: string;
}

export interface QuestionDoc {
  question_id: string;
  text: string;
  vector_data: number[];
  answers: AnswerDoc[];
}
