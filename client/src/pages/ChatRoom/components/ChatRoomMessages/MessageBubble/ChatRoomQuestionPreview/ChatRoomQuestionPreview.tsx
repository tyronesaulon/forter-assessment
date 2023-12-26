import { ChatRoomQuestionFragment } from '../../../../../../graphql.types.tsx';
import { Stack, Text } from '@mantine/core';
import * as Classes from './ChatRoomQuestionPreview.module.css';
import { clsx } from 'clsx';
import { UsernameText } from '../UsernameText/UsernameText.tsx';

export interface ChatRoomQuestionPreview {
  question?: ChatRoomQuestionFragment | null;
  isBotPreview?: boolean;
}

function getPreviewUserNameByFragment(
  question?: ChatRoomQuestionFragment | null,
) {
  let name = 'Anonymous';
  if (question?.user?.name) {
    name = question.user.name;
  }

  return name;
}

export function ChatRoomQuestionPreview({
  question,
  isBotPreview,
}: ChatRoomQuestionPreview) {
  const name = getPreviewUserNameByFragment(question);
  const text = question?.text ?? '';
  if (!question || !text) return null;
  return (
    <Stack
      gap={0}
      className={clsx(Classes.container, {
        [Classes.clarence]: isBotPreview,
      })}
      p="md"
      my="md"
    >
      <UsernameText>{name} asked:</UsernameText>
      <Text size="sm" m={0}>
        {question.text}
      </Text>
    </Stack>
  );
}
