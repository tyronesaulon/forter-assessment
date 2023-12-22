import { Kbd, Text } from '@mantine/core';
import Classes from '../ChatRoomInput.module.css';
import { useOs } from '@mantine/hooks';

export function SendShortcut() {
  const os = useOs();

  const mac = os === 'macos';
  const windows = os === 'windows';

  const cmdKey = mac ? '⌘' : windows ? 'Ctrl' : '';
  if (!cmdKey) {
    return null;
  }

  return (
    <Text fw={500} className={Classes.kbd}>
      <Kbd>{cmdKey}</Kbd> + <Kbd>Enter</Kbd> to send
    </Text>
  );
}
