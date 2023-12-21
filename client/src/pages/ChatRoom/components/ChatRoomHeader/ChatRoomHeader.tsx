import { Text } from '@mantine/core';
import { Participant } from '../../../../domains/Participant/Participant.models.ts';

export interface ChatRoomHeaderProps {
  participants: Participant[];
}

export function ChatRoomHeader({ participants }: ChatRoomHeaderProps) {
  return <Text>{JSON.stringify(participants)}</Text>;
}
