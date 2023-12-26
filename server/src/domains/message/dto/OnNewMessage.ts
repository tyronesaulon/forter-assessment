import { Author } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class OnNewMessageDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  question_id?: number | null;

  @IsNumber()
  user_id: number;

  @IsEnum(Author)
  author: Author;

  @IsString()
  text: string;

  @IsString()
  created_at: string;
}
