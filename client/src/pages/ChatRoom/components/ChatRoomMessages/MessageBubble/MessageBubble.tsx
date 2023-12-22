import { Box, Text } from '@mantine/core';
import { ChatRoomMessageFragment } from '../../../../../graphql.types.tsx';
import { getUserNameByFragment } from '../../../ChatRoom.utils.ts';

export interface MessageBubbleProps {
  message: ChatRoomMessageFragment;
  isCurrentUser?: boolean;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const name = getUserNameByFragment(message);
  return (
    <Box>
      <Text>{name}</Text>
      <Text>{message.text}</Text>
      <Text>{message.created_at}</Text>
    </Box>
  );
}
