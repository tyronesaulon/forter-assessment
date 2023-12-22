import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getCachedUser,
  getUserByInsertionResult,
  setCachedUser,
} from './UserContext.utils.ts';
import { useCreateUserMutation, UserFragment } from '../../graphql.types.tsx';
import { LoadingPage } from '../../components/LoadingPage/LoadingPage.tsx';

export interface UserContextValue {
  currentUser?: UserFragment;
}

export const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({ children }: PropsWithChildren) {
  const [createUser, { loading }] = useCreateUserMutation();
  const [currentUser, setCurrentUser] = useState<UserFragment>();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      let user = getCachedUser();
      if (user) {
        setCurrentUser(user);
      } else {
        const { data } = await createUser({
          variables: {
            name: '',
          },
        });

        if (!mounted) return;
        user = getUserByInsertionResult(data);
        setCurrentUser(user);
        setCachedUser(user);
      }
    };

    init().catch();

    return () => {
      mounted = false;
    };
  }, [createUser]);

  const value = useMemo(() => ({ currentUser }), [currentUser]);

  if (loading) return <LoadingPage />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
