import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../../domains/User/User.model.ts';
import { getCachedUser, setCachedUser } from './UserContext.utils.ts';

export interface UserContextValue {
  user: User | null;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({ children }: PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) return;
    let user = getCachedUser();
    if (!user) {
      // TODO: create user and set user
      user = {} as User;
    }

    setCurrentUser(user);
    setCachedUser(user);
  }, [currentUser]);

  const value = useMemo(
    () => ({
      user: currentUser,
    }),
    [currentUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
