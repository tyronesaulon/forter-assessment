import { ChatRoomMessageFragment } from '../../../../graphql.types.tsx';
import { ActionIcon, Blockquote } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export interface ChatRoomQuestionPreviewProps {
  question?: ChatRoomMessageFragment;
  onClose: () => void;
}

export function ChatRoomQuestionPreview({
  question,
  onClose,
}: ChatRoomQuestionPreviewProps) {
  const text = question?.text ?? '';
  const username = question?.user?.name ?? '';
  const cite = username ? `– ${username}` : '';

  if (!question) return null;
  return (
    <Blockquote
      cite={cite}
      icon={
        <ActionIcon radius="xl" size="sm" color="gray.8" onClick={onClose}>
          <IconX size={16} />
        </ActionIcon>
      }
      iconSize={24}
      m={0}
    >
      {text}
    </Blockquote>
  );
}
