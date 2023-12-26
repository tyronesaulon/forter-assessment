import { Injectable, Logger } from '@nestjs/common';
import { RunnableSequence } from 'langchain/schema/runnable';
import { PromptTemplate } from 'langchain/prompts';
import { OpenAIClient } from '../../clients/openai/openai.client';

@Injectable()
export class PersonalityService {
  private readonly logger = new Logger(PersonalityService.name);

  constructor(private readonly openai: OpenAIClient) {}

  async personalize(question: string, answer: string): Promise<string> {
    this.logger.log('personalizing', {
      question,
      answer,
    });

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        `Add some witty, humorous and spicy attitude to the answer based on the the following question and answer.\n{question}\n{answer}`,
      ),
      this.openai.llm,
    ]);

    this.logger.log('running personality chain', {
      question,
      answer,
    });

    const response = await chain.invoke({
      question,
      answer,
    });

    this.logger.log('finished running personality chain', {
      question,
      answer,
      response,
    });

    return response;
  }
}
