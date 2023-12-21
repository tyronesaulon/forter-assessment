import { User } from '../../domains/User/User.model.ts';

export function getCachedUser(): User | null {
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

export function setCachedUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}
