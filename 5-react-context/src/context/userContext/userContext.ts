import { createContext  } from 'react';

export type User = {
  id: string;
  username: string;
  email: string;
};


export const UserContext = createContext({});