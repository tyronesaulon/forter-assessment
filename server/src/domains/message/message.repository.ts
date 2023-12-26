import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../clients/prisma/prisma.client';
import { Message } from '@prisma/client';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get(id: number) {
    return this.prisma.message.findFirstOrThrow({
      where: { id },
    });
  }

  create(data: Partial<Message>) {
    return this.prisma.message.create({
      data,
    });
  }
}
