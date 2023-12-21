import { Message } from '../../../../domains/Message/Message.models.ts';

export interface ChatRoomMessagesProps {
  messages: Message[];
}

export function ChatRoomMessages({ messages }: ChatRoomMessagesProps) {
  return <div>{JSON.stringify(messages, null, 2)}</div>;
}
