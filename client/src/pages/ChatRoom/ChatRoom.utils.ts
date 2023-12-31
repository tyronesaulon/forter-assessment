import {
  ChatRoomMessageFragment,
  LoadChatRoomQuery,
} from '../../graphql.types.tsx';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

export function getMessagesByQueryResult(
  data?: LoadChatRoomQuery,
): ChatRoomMessageFragment[] {
  return data?.message ?? [];
}

export function getTotalParticipants(data?: LoadChatRoomQuery): number {
  return data?.user_aggregate?.aggregate?.count ?? 0;
}

export function getUserNameByFragment(data?: ChatRoomMessageFragment): string {
  let name = '';
  if (!data?.user?.id) {
    name = 'Clarence';
  } else if (!data?.user?.name) {
    name = 'Anonymous';
  } else {
    name = data.user.name;
  }

  return name;
}

export function getTimeLabelByDate(date: string): string {
  return dayjs(date).utc(true).fromNow();
}
