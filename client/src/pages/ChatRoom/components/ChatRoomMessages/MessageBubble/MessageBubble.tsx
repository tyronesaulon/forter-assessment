import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { ChatRoomMessageFragment } from '../../../../../graphql.types.tsx';
import {
  getTimeLabelByDate,
  getUserNameByFragment,
} from '../../../ChatRoom.utils.ts';
import { useMemo } from 'react';
import * as Classes from './MessageBubble.module.css';
import { clsx } from 'clsx';
import { useUserContext } from '../../../../../contexts/UserContext/useUserContext.ts';
import { isQuestion } from './MessageBubble.utils.ts';
import { IconMessagePlus } from '@tabler/icons-react';

export interface MessageBubbleProps {
  message: ChatRoomMessageFragment;
  isCurrentUser?: boolean;
  onAnswer: (message?: ChatRoomMessageFragment) => void;
}

export function MessageBubble({ message, onAnswer }: MessageBubbleProps) {
  const { currentUser } = useUserContext();
  const question = isQuestion(message?.text);
  const name = getUserNameByFragment(message) || 'Anonymous';
  const timestamp = useMemo(
    () => getTimeLabelByDate(message.created_at),
    [message.created_at],
  );

  const isCurrentUser = currentUser && currentUser?.id === message?.user?.id;

  return (
    <Stack gap={5}>
      <Box
        className={clsx(Classes.message, {
          [Classes.currentUser]: isCurrentUser,
          [Classes.otherUser]: !isCurrentUser,
        })}
        h="50px"
      >
        <Group justify="space-between">
          <Text className={Classes.username} size="sm" fw={500} m={0}>
            {name}
            {isCurrentUser && (
              <Badge component="span" size="xs" ml={4}>
                You
              </Badge>
            )}
          </Text>
          {question && (
            <Tooltip label="Answer">
              <ActionIcon
                size="md"
                variant="subtle"
                radius="xl"
                onClick={() => onAnswer(message)}
              >
                <IconMessagePlus size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <Text size="sm" m={0}>
          {message.text}
        </Text>
      </Box>
      <Text
        className={clsx({
          [Classes.currentUser]: isCurrentUser,
          [Classes.otherUser]: !isCurrentUser,
        })}
        c="dimmed"
        size="xs"
        m={0}
      >
        {timestamp}
      </Text>
    </Stack>
  );
}
