import { gql } from '@apollo/client';

export const CHAT_ROOM_MESSAGE_FRAGMENT = gql`
  fragment ChatRoomMessage on message {
    author
    created_at
    id
    text
    user {
      ...User
    }
    question {
      user {
        name
      }
      text
    }
  }
`;

export const LOAD_CHAT_ROOM_QUERY = gql`
  query LoadChatRoom {
    message {
      ...ChatRoomMessage
    }
    user_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_LATEST_MESSAGE = gql`
  subscription GetLatestMessage {
    message(order_by: { id: desc }, limit: 1) {
      ...ChatRoomMessage
    }
  }
`;
