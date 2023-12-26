import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient as BasePrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClient
  extends BasePrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger: Logger = new Logger(PrismaClient.name);
  async onModuleInit() {
    try {
      this.logger.log('connecting to database...');
      await this.$connect();
      this.logger.log('connected to database');
    } catch (e) {
      this.logger.error('failed to connect to database', e);
    }
  }

  async onApplicationShutdown() {
    try {
      this.logger.log('disconnecting from database...');
      await this.$disconnect();
      this.logger.log('disconnected from database');
    } catch (e) {
      this.logger.error('failed to disconnect from database', e);
    }
  }
}
