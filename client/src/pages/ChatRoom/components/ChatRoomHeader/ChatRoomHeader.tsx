import { Group, Skeleton, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const HeaderTitle = ({ children }: PropsWithChildren) => (
  <Title order={6} m={0}>
    {children}
  </Title>
);

export interface ChatRoomHeaderProps {
  totalParticipants: number;
  loading: boolean;
}

export function ChatRoomHeader({
  totalParticipants,
  loading,
}: ChatRoomHeaderProps) {
  return (
    <Group justify="space-between" mb="lg">
      <HeaderTitle>Clarence</HeaderTitle>
      <HeaderTitle>
        <Skeleton visible={loading}>{totalParticipants} participants</Skeleton>
      </HeaderTitle>
    </Group>
  );
}
