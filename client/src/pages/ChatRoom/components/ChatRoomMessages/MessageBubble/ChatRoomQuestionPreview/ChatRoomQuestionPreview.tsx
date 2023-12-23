import { ChatRoomQuestionFragment } from '../../../../../../graphql.types.tsx';
import { Stack, Text } from '@mantine/core';
import * as Classes from './ChatRoomQuestionPreview.module.css';
import { clsx } from 'clsx';
import { UsernameText } from '../UsernameText/UsernameText.tsx';

export interface ChatRoomQuestionPreview {
  question?: ChatRoomQuestionFragment | null;
}

export function ChatRoomQuestionPreview({ question }: ChatRoomQuestionPreview) {
  const name = question?.user?.name ?? 'Anonymous';
  const text = question?.text ?? '';
  if (!question || !text) return null;
  return (
    <Stack gap={0} className={clsx(Classes.container)} p="md" my="md">
      <UsernameText>{name} asked:</UsernameText>
      <Text size="sm" m={0}>
        {question.text}
      </Text>
    </Stack>
  );
}
