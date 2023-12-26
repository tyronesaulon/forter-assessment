import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';
import { ElasticSearchClient } from '../elasticsearch/elasticsearch.client';
import { ElasticIndex } from '../../models/common.enum';

@Injectable()
export class OpenAIClient {
  public readonly llm: OpenAI;
  public readonly embeddings: OpenAIEmbeddings;
  public readonly store: ElasticVectorSearch;
  private readonly logger = new Logger(OpenAIClient.name);
  constructor(
    private readonly config: ConfigService,
    private readonly elastic: ElasticSearchClient,
  ) {
    this.logger.log('creating openai client...');
    const apiKey = this.config.get('OPEN_AI_API_KEY');
    this.embeddings = new OpenAIEmbeddings({ openAIApiKey: apiKey });

    this.llm = new OpenAI({
      openAIApiKey: apiKey,
      modelName: 'gpt-3.5-turbo-1106',
    });

    this.store = new ElasticVectorSearch(this.embeddings, {
      client: this.elastic.client,
      indexName: ElasticIndex.QUESTIONS,
    });
    this.logger.log('openai client created');
  }
}
