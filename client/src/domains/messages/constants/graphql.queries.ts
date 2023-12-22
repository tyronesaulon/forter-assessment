import { gql } from '@apollo/client';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage(
    $user_id: bigint!
    $text: String!
    $question_id: bigint = null
  ) {
    insert_message_one(
      object: { user_id: $user_id, text: $text, question_id: $question_id }
    ) {
      ...ChatRoomMessage
    }
  }
`;
