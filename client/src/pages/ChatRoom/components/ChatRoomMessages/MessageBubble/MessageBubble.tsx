import { Message } from '../../../../../domains/Message/Message.models.ts';
import { Box, Text } from '@mantine/core';
import { User } from '../../../../../domains/User/User.model.ts';

export interface MessageBubbleProps {
  message: Message;
  user: User;
}

export function MessageBubble({ message, user }: MessageBubbleProps) {
  return (
    <Box>
      <Text>{user.name}</Text>
      <Text>{message.text}</Text>
    </Box>
  );
}
