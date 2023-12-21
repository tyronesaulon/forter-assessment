import { Group, Title } from '@mantine/core';
import { User } from '../../../../domains/User/User.model.ts';
import { PropsWithChildren } from 'react';

export const HeaderTitle = ({ children }: PropsWithChildren) => (
  <Title order={6} m={0}>
    {children}
  </Title>
);

export interface ChatRoomHeaderProps {
  users: User[];
}

export function ChatRoomHeader({ users }: ChatRoomHeaderProps) {
  const length = users.length;
  return (
    <Group justify="space-between" mb="lg">
      <HeaderTitle>Clarence</HeaderTitle>
      <HeaderTitle>{length} participants</HeaderTitle>
    </Group>
  );
}
