import {
  ChatRoomMessageFragment,
  LoadChatRoomQuery,
} from '../../graphql.types.tsx';

export function getMessagesWithUser(
  data?: LoadChatRoomQuery,
): ChatRoomMessageFragment[] {
  return data?.message ?? [];
}

export function getTotalParticipants(data?: LoadChatRoomQuery): number {
  return data?.user_aggregate?.aggregate?.count ?? 0;
}

export function getUserNameByFragment(data?: ChatRoomMessageFragment): string {
  return data?.user?.name ?? 'unknown';
}
