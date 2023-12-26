import { Stack } from '@mantine/core';
import { MessageBubble } from './MessageBubble/MessageBubble.tsx';
import { ChatRoomMessageFragment } from '../../../../graphql.types.tsx';
import * as Classes from './ChatRoomMessages.module.css';
import { useEffect, useRef } from 'react';

export interface ChatRoomMessagesProps {
  messages: ChatRoomMessageFragment[];
  onAnswer: (message?: ChatRoomMessageFragment) => void;
}

export function ChatRoomMessages({
  messages,
  onAnswer,
}: ChatRoomMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <Stack ref={containerRef} className={Classes.container}>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onAnswer={onAnswer} />
      ))}
    </Stack>
  );
}
