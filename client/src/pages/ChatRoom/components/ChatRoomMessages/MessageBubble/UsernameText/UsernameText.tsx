import { Text } from '@mantine/core';
import { PropsWithChildren } from 'react';
import * as Classes from './UsernameText.module.css';

export function UsernameText({ children }: PropsWithChildren) {
  return (
    <Text className={Classes.username} size="sm" fw={500} m={0}>
      {children}
    </Text>
  );
}
