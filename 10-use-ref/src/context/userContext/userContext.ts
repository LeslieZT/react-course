import { createContext  } from 'react';

export type User = {
  id: string;
  username: string;
  email: string;
};

export interface UserContextType {
  user: User | undefined;
  login: () => void;
  logOut: () => void;
}

const initialState: UserContextType = {
  user: undefined,
  login: () => null,
  logOut: () => null,
};

export const UserContext = createContext<UserContextType>(initialState);