import { ActionIcon, Stack, Textarea } from '@mantine/core';
import { useState } from 'react';
import { IconSend } from '@tabler/icons-react';
import { SendShortcut } from './SendShortcut/SendShortcut.tsx';

export interface ChatRoomInput {
  onSend: (message: string) => Promise<void>;
  sending: boolean;
}

export function ChatRoomInput({ onSend, sending }: ChatRoomInput) {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    const value = message.trim();
    if (!value) {
      return;
    }

    try {
      await onSend(value);
      setMessage('');
    } catch (e) {
      console.error('failed to send message', value);
    }
  };

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSend().catch();
    }
  };

  return (
    <Stack gap="xs">
      <Textarea
        size="md"
        mb={0}
        value={message}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question..."
        rightSection={
          <ActionIcon
            variant="subtle"
            onClick={handleSend}
            loading={sending}
            mr="lg"
            radius="xl"
          >
            <IconSend size={18} />
          </ActionIcon>
        }
      />
      <SendShortcut />
    </Stack>
  );
}
