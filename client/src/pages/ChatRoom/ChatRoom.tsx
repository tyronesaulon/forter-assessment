import { Card, Container, Stack } from '@mantine/core';
import { ChatRoomHeader } from './components/ChatRoomHeader/ChatRoomHeader.tsx';
import { ChatRoomMessages } from './components/ChatRoomMessages/ChatRoomMessages.tsx';
import { ChatRoomInput } from './components/ChatRoomInput/ChatRoomInput.tsx';
import {
  useCreateMessageMutation,
  useLoadChatRoomQuery,
} from '../../graphql.types.tsx';
import { getMessagesWithUser, getTotalParticipants } from './ChatRoom.utils.ts';
import { useUserContext } from '../../contexts/UserContext/useUserContext.ts';

import * as SharedClasses from '../../shared/shared.module.css';
import * as Classes from './ChatRoom.module.css';

export function ChatRoom() {
  const { currentUser } = useUserContext();
  const { data, loading } = useLoadChatRoomQuery();
  const [createMessage, { loading: sending }] = useCreateMessageMutation();
  const messages = getMessagesWithUser(data);
  const totalParticipants = getTotalParticipants(data);

  const handleSend = async (text: string) => {
    await createMessage({
      variables: {
        text,
        user_id: currentUser?.id,
      },
    });
  };

  return (
    <Container classNames={{ root: SharedClasses.page }} size="xs">
      <Stack className={Classes.messageContainer}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <ChatRoomHeader
            totalParticipants={totalParticipants}
            loading={loading}
          />
          <ChatRoomMessages messages={messages} />
        </Card>
        <ChatRoomInput onSend={handleSend} sending={sending} />
      </Stack>
    </Container>
  );
}
