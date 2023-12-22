import { CreateUserMutation, UserFragment } from '../../graphql.types.tsx';
import { faker } from '@faker-js/faker';

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

export function getRandomUserName(): string {
  const adj1 = faker.person.jobDescriptor();
  const adj2 = faker.person.jobDescriptor();
  let name = faker.animal.type();
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return `${adj1}${adj2}${name}`;
}
