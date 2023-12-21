import { Message } from '../../../../domains/Message/Message.models.ts';
import { Stack } from '@mantine/core';
import { MessageBubble } from './MessageBubble/MessageBubble.tsx';

export interface ChatRoomMessagesProps {
  messages: Message[];
}

export function ChatRoomMessages({ messages }: ChatRoomMessagesProps) {
  return (
    <Stack>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message}>
          {message.text}
        </MessageBubble>
      ))}
    </Stack>
  );
}
