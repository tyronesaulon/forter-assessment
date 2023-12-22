import { gql } from '@apollo/client';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($user_id: bigint!, $text: String!) {
    insert_message_one(object: { user_id: $user_id, text: $text }) {
      ...ChatRoomMessage
    }
  }
`;
