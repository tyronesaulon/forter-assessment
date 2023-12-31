import { Card, Container, Stack } from '@mantine/core';
import { ChatRoomHeader } from './components/ChatRoomHeader/ChatRoomHeader.tsx';
import { ChatRoomMessages } from './components/ChatRoomMessages/ChatRoomMessages.tsx';
import { ChatRoomInput } from './components/ChatRoomInput/ChatRoomInput.tsx';
import {
  ChatRoomMessageFragment,
  LoadChatRoomDocument,
  LoadChatRoomQuery,
  useCreateMessageMutation,
  useLoadChatRoomQuery,
  useOnNewMessageSubscription,
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
import { apollo } from '../../clients/apollo.client.ts';

function isMessageCached(
  chatRoomQuery: LoadChatRoomQuery | null | undefined,
  message: ChatRoomMessageFragment,
) {
  return chatRoomQuery?.message.some((m) => m.id === message.id) ?? false;
}

function cacheNewMessage(message: ChatRoomMessageFragment): void {
  const chatRoomQuery = apollo.cache.readQuery<LoadChatRoomQuery>({
    query: LoadChatRoomDocument,
  });

  if (isMessageCached(chatRoomQuery, message)) return;

  const messages = chatRoomQuery?.message.slice() ?? [];
  messages.push(message);

  apollo.cache.writeQuery({
    query: LoadChatRoomDocument,
    data: { ...chatRoomQuery, message: messages },
  });
}

export function ChatRoom() {
  const { currentUser } = useUserContext();
  const { data, loading } = useLoadChatRoomQuery();
  const [createMessage, { loading: sending }] = useCreateMessageMutation();
  const [question, setQuestion] = useState<ChatRoomMessageFragment>();
  const messages = getMessagesByQueryResult(data);
  const totalParticipants = getTotalParticipants(data);

  useOnNewMessageSubscription({
    onData: ({ data: result }) => {
      const newMessage = result.data?.message?.[0];
      if (!newMessage) return;

      cacheNewMessage(newMessage);
    },
  });

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
