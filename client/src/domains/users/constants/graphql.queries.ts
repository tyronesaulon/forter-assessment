import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment User on user {
    id
    name
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!) {
    insert_user_one(object: { name: $name }) {
      ...User
    }
  }
`;
