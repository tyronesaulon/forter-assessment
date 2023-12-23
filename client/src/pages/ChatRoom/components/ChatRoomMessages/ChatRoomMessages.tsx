import { Stack } from '@mantine/core';
import { MessageBubble } from './MessageBubble/MessageBubble.tsx';
import { ChatRoomMessageFragment } from '../../../../graphql.types.tsx';
import * as Classes from './ChatRoomMessages.module.css';
import { useEffect, useRef, useState } from 'react';

export interface ChatRoomMessagesProps {
  messages: ChatRoomMessageFragment[];
  onAnswer: (message?: ChatRoomMessageFragment) => void;
}

export function ChatRoomMessages({
  messages,
  onAnswer,
}: ChatRoomMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  // init scroll position to bottom
  useEffect(() => {
    if (initialized) return;
    if (!messages.length || !containerRef.current) return;
    setInitialized(true);
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
