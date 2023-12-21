import { Button, Textarea } from '@mantine/core';
import { useState } from 'react';

export interface ChatRoomInput {
  onSend: (message: string) => void;
}

export function ChatRoomInput({ onSend }: ChatRoomInput) {
  const [message, setMessage] = useState('');
  const handleSend = () => {
    onSend(message);
  };

  return (
    <Textarea
      onChange={setMessage}
      placeholder="Type your message"
      rightSection={<Button onClick={handleSend}>Send</Button>}
    />
  );
}
