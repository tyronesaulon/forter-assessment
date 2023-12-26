import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticIndex } from '../../models/common.enum';
import { ElasticSearchClient } from '../../clients/elasticsearch/elasticsearch.client';
import { QuestionDoc } from './models/question.interface';
import { OpenAIClient } from '../../clients/openai/openai.client';
import { Document } from 'langchain/document';

@Injectable()
export class QuestionRepository implements OnModuleInit {
  private readonly logger = new Logger(QuestionRepository.name);
  private readonly index = ElasticIndex.QUESTIONS;
  private readonly VALID_SIMILARITY_SCORE = 0.985;

  constructor(
    private readonly elastic: ElasticSearchClient,
    private readonly openai: OpenAIClient,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log(`creating index ${this.index}...`);
      await this.elastic.client.indices.create({
        index: this.index,
      });

      this.logger.log(`created index ${this.index}`);
    } catch (e) {
      if (e.message.includes('resource_already_exists_exception')) {
        this.logger.log(`index ${this.index} already exists`);
        return;
      }

      this.logger.error(`failed to create index ${this.index}`, e);
    }
  }

  async update(id: number, data: QuestionDoc) {
    await this.elastic.client.update<QuestionDoc>({
      index: this.index,
      id: String(id),
      doc: data,
    });
  }

  async createQuestionVector(metadata: QuestionDoc) {
    this.logger.log('creating question vector...', { metadata });

    const results = await this.openai.store.addDocuments([
      new Document({
        metadata,
        pageContent: metadata.text,
      }),
    ]);

    this.logger.log('created question vector', { metadata, results });
  }

  async search(query: string) {
    const [result] = await this.openai.store.similaritySearchWithScore(
      query,
      1,
    );

    const [doc, score] = result;
    if (score < this.VALID_SIMILARITY_SCORE) {
      return;
    }

    return doc.metadata as QuestionDoc;
  }

  get(id: number) {
    return this.elastic.client.get<QuestionDoc>({
      index: this.index,
      id: String(id),
    });
  }

  exists(id: number) {
    return this.elastic.client.exists({
      index: this.index,
      id: String(id),
    });
  }
}
