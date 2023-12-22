import { CreateUserMutation, UserFragment } from '../../graphql.types.tsx';

export function getCachedUser(): UserFragment | null {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (e) {
    return null;
  }
}

export function setCachedUser(user: UserFragment): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserByInsertionResult(
  data?: CreateUserMutation | null,
): UserFragment {
  return data?.insert_user_one as UserFragment;
}
