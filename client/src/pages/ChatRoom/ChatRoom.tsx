import { useState } from 'react';
import { Participant } from '../../domains/Participant/Participant.models.ts';
import { Message } from '../../domains/Message/Message.models.ts';
import { Card, Container } from '@mantine/core';
import { ChatRoomHeader } from './components/ChatRoomHeader/ChatRoomHeader.tsx';
import { ChatRoomMessages } from './components/ChatRoomMessages/ChatRoomMessages.tsx';
import { ChatRoomInput } from './components/ChatRoomInput/ChatRoomInput.tsx';

export function ChatRoom() {
  const [messages] = useState<Message[]>([]);
  const [participants] = useState<Participant[]>([]);

  const handleSend = (message: string) => {
    console.log('send message', message);
  };

  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <ChatRoomHeader participants={participants} />
        </Card.Section>
        <Card.Section>
          <ChatRoomMessages messages={messages} />
        </Card.Section>
        <Card.Section>
          <ChatRoomInput onSend={handleSend} />
        </Card.Section>
      </Card>
    </Container>
  );
}
