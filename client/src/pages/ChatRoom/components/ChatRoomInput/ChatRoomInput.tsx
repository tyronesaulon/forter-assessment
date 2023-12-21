import { ActionIcon, Textarea } from '@mantine/core';
import { useState } from 'react';
import { IconSend } from '@tabler/icons-react';

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
      placeholder="Ask a question..."
      rightSection={
        <ActionIcon variant="subtle" onClick={handleSend}>
          <IconSend />
        </ActionIcon>
      }
    />
  );
}
