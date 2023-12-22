import { Card, Container, Stack } from '@mantine/core';
import { ChatRoomHeader } from './components/ChatRoomHeader/ChatRoomHeader.tsx';
import { ChatRoomMessages } from './components/ChatRoomMessages/ChatRoomMessages.tsx';
import { ChatRoomInput } from './components/ChatRoomInput/ChatRoomInput.tsx';
import {
  ChatRoomMessageFragment,
  useCreateMessageMutation,
  useLoadChatRoomQuery,
} from '../../graphql.types.tsx';
import {
  getMessagesByQueryResult,
  getTotalParticipants,
} from './ChatRoom.utils.ts';
import { useUserContext } from '../../contexts/UserContext/useUserContext.ts';

import * as SharedClasses from '../../shared/shared.module.css';
import * as Classes from './ChatRoom.module.css';
import { useState } from 'react';
import { ChatRoomQuestionPreview } from './components/ChatRoomQuestionPreview/ChatRoomQuestionPreview.tsx';

export function ChatRoom() {
  const { currentUser } = useUserContext();
  const { data, loading } = useLoadChatRoomQuery();
  const [createMessage, { loading: sending }] = useCreateMessageMutation();
  const [question, setQuestion] = useState<ChatRoomMessageFragment>();
  const messages = getMessagesByQueryResult(data);
  const totalParticipants = getTotalParticipants(data);

  const handleClosePreview = () => {
    setQuestion(undefined);
  };

  const handleAnswer = (message?: ChatRoomMessageFragment) => {
    if (!message) return;
    setQuestion(message);
  };

  const handleSend = async (text: string) => {
    await createMessage({
      variables: {
        text,
        user_id: currentUser?.id,
        question_id: question?.id,
      },
    });

    handleClosePreview();
  };

  return (
    <Container classNames={{ root: SharedClasses.page }} size="xs">
      <Stack className={Classes.messageContainer}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <ChatRoomHeader
            totalParticipants={totalParticipants}
            loading={loading}
          />
          <ChatRoomMessages messages={messages} onAnswer={handleAnswer} />
        </Card>
        <ChatRoomQuestionPreview
          question={question}
          onClose={handleClosePreview}
        />
        <ChatRoomInput onSend={handleSend} sending={sending} />
      </Stack>
    </Container>
  );
}
