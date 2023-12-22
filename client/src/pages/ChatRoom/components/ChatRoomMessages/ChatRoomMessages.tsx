import { Stack } from '@mantine/core';
import { MessageBubble } from './MessageBubble/MessageBubble.tsx';
import { ChatRoomMessageFragment } from '../../../../graphql.types.tsx';
import * as Classes from './ChatRoomMessages.module.css';

export interface ChatRoomMessagesProps {
  messages: ChatRoomMessageFragment[];
  onAnswer: (message?: ChatRoomMessageFragment) => void;
}

export function ChatRoomMessages({
  messages,
  onAnswer,
}: ChatRoomMessagesProps) {
  return (
    <Stack className={Classes.container}>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onAnswer={onAnswer} />
      ))}
    </Stack>
  );
}
