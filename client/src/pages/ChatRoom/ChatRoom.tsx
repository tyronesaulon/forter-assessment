import { Card, Container, Stack } from '@mantine/core';
import { ChatRoomHeader } from './components/ChatRoomHeader/ChatRoomHeader.tsx';
import { ChatRoomMessages } from './components/ChatRoomMessages/ChatRoomMessages.tsx';
import { ChatRoomInput } from './components/ChatRoomInput/ChatRoomInput.tsx';

import * as SharedClasses from '../../shared/shared.module.css';
import * as Classes from './ChatRoom.module.css';

export function ChatRoom() {
  return (
    <Container classNames={{ root: SharedClasses.page }} size="xs">
      <Stack className={Classes.messageContainer}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <ChatRoomHeader users={[]} />
          <ChatRoomMessages messages={[]} />
        </Card>
        <ChatRoomInput onSend={() => {}} />
      </Stack>
    </Container>
  );
}
