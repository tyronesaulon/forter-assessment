import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticSearchClient implements OnModuleInit {
  public readonly client: Client;
  private readonly logger = new Logger(ElasticSearchClient.name);

  constructor(private readonly config: ConfigService) {
    this.client = new Client({
      node: this.config.get<string>('ELASTIC_SEARCH_URL'),
    });
  }

  async onModuleInit() {
    try {
      this.logger.log('checking elasticsearch connection...');
      await this.client.ping();
      this.logger.log('elasticsearch connection ok');
    } catch (e) {
      this.logger.error('elasticsearch connection failed');
      this.logger.error(e);
      throw e;
    }
  }
}
